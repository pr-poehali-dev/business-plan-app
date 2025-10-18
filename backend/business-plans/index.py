'''
Business: CRUD операции для бизнес-планов пользователей
Args: event - dict с httpMethod, body, queryStringParameters, headers
      context - объект с атрибутами: request_id, function_name
Returns: HTTP response dict с данными бизнес-планов или результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        plan_id = params.get('id')
        
        if plan_id:
            cur.execute(
                "SELECT id, title, category, description, investment, payback, content, created_at FROM business_plans WHERE id = %s AND user_id = %s",
                (plan_id, user_id)
            )
            row = cur.fetchone()
            
            if not row:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Бизнес-план не найден'}),
                    'isBase64Encoded': False
                }
            
            plan = {
                'id': row[0],
                'title': row[1],
                'category': row[2],
                'description': row[3],
                'investment': row[4],
                'payback': row[5],
                'content': row[6],
                'created_at': row[7].isoformat() if row[7] else None
            }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(plan),
                'isBase64Encoded': False
            }
        else:
            cur.execute(
                "SELECT id, title, category, description, investment, payback, created_at FROM business_plans WHERE user_id = %s ORDER BY created_at DESC",
                (user_id,)
            )
            rows = cur.fetchall()
            
            plans = [
                {
                    'id': row[0],
                    'title': row[1],
                    'category': row[2],
                    'description': row[3],
                    'investment': row[4],
                    'payback': row[5],
                    'created_at': row[6].isoformat() if row[6] else None
                }
                for row in rows
            ]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'plans': plans}),
                'isBase64Encoded': False
            }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        title = body_data.get('title')
        category = body_data.get('category', '')
        description = body_data.get('description', '')
        investment = body_data.get('investment', '')
        payback = body_data.get('payback', '')
        content = body_data.get('content', {})
        
        if not title:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Название обязательно'}),
                'isBase64Encoded': False
            }
        
        cur.execute(
            "INSERT INTO business_plans (user_id, title, category, description, investment, payback, content) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at",
            (user_id, title, category, description, investment, payback, json.dumps(content))
        )
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'id': result[0],
                'created_at': result[1].isoformat() if result[1] else None
            }),
            'isBase64Encoded': False
        }
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        plan_id = body_data.get('id')
        
        if not plan_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'ID бизнес-плана обязателен'}),
                'isBase64Encoded': False
            }
        
        cur.execute("SELECT id FROM business_plans WHERE id = %s AND user_id = %s", (plan_id, user_id))
        if not cur.fetchone():
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Бизнес-план не найден'}),
                'isBase64Encoded': False
            }
        
        title = body_data.get('title')
        category = body_data.get('category')
        description = body_data.get('description')
        investment = body_data.get('investment')
        payback = body_data.get('payback')
        content = body_data.get('content')
        
        update_fields = []
        update_values = []
        
        if title is not None:
            update_fields.append("title = %s")
            update_values.append(title)
        if category is not None:
            update_fields.append("category = %s")
            update_values.append(category)
        if description is not None:
            update_fields.append("description = %s")
            update_values.append(description)
        if investment is not None:
            update_fields.append("investment = %s")
            update_values.append(investment)
        if payback is not None:
            update_fields.append("payback = %s")
            update_values.append(payback)
        if content is not None:
            update_fields.append("content = %s")
            update_values.append(json.dumps(content))
        
        update_fields.append("updated_at = CURRENT_TIMESTAMP")
        update_values.extend([plan_id, user_id])
        
        cur.execute(
            f"UPDATE business_plans SET {', '.join(update_fields)} WHERE id = %s AND user_id = %s",
            tuple(update_values)
        )
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        plan_id = params.get('id')
        
        if not plan_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'ID бизнес-плана обязателен'}),
                'isBase64Encoded': False
            }
        
        cur.execute("SELECT id FROM business_plans WHERE id = %s AND user_id = %s", (plan_id, user_id))
        if not cur.fetchone():
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Бизнес-план не найден'}),
                'isBase64Encoded': False
            }
        
        cur.execute("UPDATE business_plans SET updated_at = CURRENT_TIMESTAMP WHERE id = %s AND user_id = %s", (plan_id, user_id))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }
