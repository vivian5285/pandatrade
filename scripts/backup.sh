#!/bin/bash

# 备份 PostgreSQL 数据库
PG_DUMP_PATH="/backups/pandatrade_$(date +%F).sql"
pg_dump -U postgres -d pandatrade > $PG_DUMP_PATH

# 备份 Redis 数据
REDIS_DUMP_PATH="/backups/redis_dump_$(date +%F).rdb"
cp /var/lib/redis/dump.rdb $REDIS_DUMP_PATH

echo "Backup completed: $PG_DUMP_PATH and $REDIS_DUMP_PATH"
