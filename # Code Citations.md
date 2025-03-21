# Code Citations

## License: 未知
https://github.com/michalwrona01/ReceiptAPI/tree/60ad45a94325357419220873bb482698630a4de4/models.py

```
.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active =
```

## License: 未知
https://github.com/SaraJohanssonn/booking_class/tree/dd1be957f963fa4566cb34f7cf09a2faf8e706e9/src/components/UserTable.tsx

```
</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email
```
