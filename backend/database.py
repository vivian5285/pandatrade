from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import redis

# MySQL 配置
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://username:password@localhost/pandatrade"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Redis 配置
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

from . import models  # 确保导入 models 模块

# 自动创建所有表
def init_db():
    Base.metadata.create_all(bind=engine)
