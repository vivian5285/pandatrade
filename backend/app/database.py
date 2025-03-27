from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import NullPool
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from app.core.config import settings

DATABASE_URL = "sqlite:///./test.db"

# 创建异步数据库 URL
ASYNC_DATABASE_URL = settings.DATABASE_URL.replace(
    "postgresql://", "postgresql+asyncpg://", 1
)

# 创建异步引擎
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    poolclass=NullPool,
    echo=settings.DEBUG,
)

# 创建异步会话
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# 创建 Base 类
Base = declarative_base()

DATABASE_URL_mongo = "mongodb://localhost:27017"
client = AsyncIOMotorClient(DATABASE_URL_mongo)
db = client.quant_analysis  # 数据库名称

# 辅助函数，用于将 MongoDB 文档转换为字典
def document_to_dict(doc):
    doc['_id'] = str(doc['_id'])  # 将 ObjectId 转换为字符串
    return doc

# 异步依赖注入
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close() 