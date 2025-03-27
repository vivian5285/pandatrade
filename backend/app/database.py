from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

DATABASE_URL_mongo = "mongodb://localhost:27017"
client = AsyncIOMotorClient(DATABASE_URL_mongo)
db = client.quant_analysis  # 数据库名称

# 辅助函数，用于将 MongoDB 文档转换为字典
def document_to_dict(doc):
    doc['_id'] = str(doc['_id'])  # 将 ObjectId 转换为字符串
    return doc 