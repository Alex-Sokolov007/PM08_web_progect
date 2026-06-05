import  sqlite3  from  'sqlite3'
import HASH_FUNCTION from './hash.js';

const db = new sqlite3.Database("config/Shops_of_food1.db")

class DB{

create_table(){
  const sql = `
    DROP TABLE Products;

    CREATE TABLE Products (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Priсe INTEGER NOT NULL,
    Type_of_measurement INTEGER NOT NULL,
    Measurement INTEGER NOT NULL,
    Img TEXT,
    FOREIGN KEY (Type_of_measurement) REFERENCES Types_of_measurement(Id)
);    

  `;
  db.run(sql, function (err) {
    if(err){
      console.log("Ошибка при добавлении таблицы" + err.message)
    }else
      console.log("Таблица добавленна")
  })

}

update_qwery(table_name, column_name, column_value, serdg_column_name, serdg_column_value) {
  const sql = `
    UPDATE ${table_name}
    SET ${column_name} = ?
    WHERE ${serdg_column_name} = ?
  `;

  db.run(sql, [column_value, serdg_column_value], function (err) {
    if (err) {
      console.error("Ошибка изменения image:", err.message);
    } else if (this.changes === 0) {
      console.warn(`Запись по полю ${serdg_column_name} = ${serdg_column_value} не найдеа`);
    } else {
      console.log(`Запись обновлена на ${column_value}`);
    }
  });
}

delete_qwery(table_name, column_name, column_value) {
  const sql = `
    DELETE FROM ${table_name}
    WHERE ${column_name} = ?
  `;

  db.run(sql, [column_value], function (err) {
    if (err) {
      console.error("Ошибка удаления записи:", err.message);
    } else if (this.changes === 0) {
      console.warn(`Запись по полю ${column_name} со значением: ${column_value} не найдена`);
    } else {
      console.log(`Запись по полю ${column_name} со значением: ${column_value} успешно удалёна`);
    }
  });
}

async get_data(table_name = 'Users', column_name = null, column_value = null) {
  return new Promise((resolve, reject) => {
  let sql = ''
  if(column_value == null){
    sql = `SELECT * FROM ${table_name}`;
  }
  else{
    sql = `SELECT * FROM ${table_name} WHERE ${column_name} = '${column_value}'`;
  }
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Ошибка выборки:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

add_type_of_measurement(type_of_measurement) {//тип исчисления
  const sql = `
    INSERT INTO Types_of_measurement (Type_of_measurement)
    VALUES (?)
  `;

  db.run(sql, [type_of_measurement], function (err) {
    if (err) {
      console.error("Ошибка при добавлении типа измерения:", err.message);
    } else {
      console.log(`Тип измерения добавлен, ID: ${this.lastID}`);
    }
  });
}

add_role(role) {//роли
  const sql = `
    INSERT INTO Roles (Role)
    VALUES (?)
  `;

  db.run(sql, [role], function (err) {
    if (err) {
      console.error("Ошибка при добавлении роли:", err.message);
    } else {
      console.log(`Роль добавлена, ID: ${this.lastID}`);
    }
  });
}

add_pay_status(pay_status) {
  const sql = `
    INSERT INTO Pay_statuses (Pay_status)
    VALUES (?)
  `;

  db.run(sql, [pay_status], function (err) {
    if (err) {
      console.error("Ошибка при добавлении статуса оплаты:", err.message);
    } else {
      console.log(`Статус оплаты добавлен, ID: ${this.lastID}`);
    }
  });
}

add_order_status(status) {
  const sql = `
    INSERT INTO Order_statuses (Status)
    VALUES (?)
  `;

  db.run(sql, [status], function (err) {
    if (err) {
      console.error("Ошибка при добавлении статуса заказа:", err.message);
    } else {
      console.log(`Статус заказа добавлен, ID: ${this.lastID}`);
    }
  });
}

async add_user(user_name, user_surname, role, login, password, phone) {
  const sql = `
    INSERT INTO Users (User_name, User_surname, Role, Login, Password, Phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  password = await HASH_FUNCTION.hashPassword(password)

  db.run(sql, [user_name, user_surname, role, login, password, phone], function (err) {
    if (err) {
      console.error("Ошибка при добавлении пользователя:", err.message);
    } else {
      console.log(`Пользователь добавлен, ID: ${this.lastID}`);
    }
  });
}

add_shop_point(title, adress, hot_phone, img) {
  const sql = `
    INSERT INTO Shop_point (Title, Adress, Hot_phone, Img)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, adress, hot_phone, img], function (err) {
    if (err) {
      console.error("Ошибка при добавлении точки магазина:", err.message);
    } else {
      console.log(`Точка магазина добавлена, ID: ${this.lastID}`);
    }
  });
}

add_shop_employee(id_user, id_shop_point) {
  const sql = `
    INSERT INTO Shop_employee (Id_user, Id_Shop_point)
    VALUES (?, ?)
  `;

  db.run(sql, [id_user, id_shop_point], function (err) {
    if (err) {
      console.error("Ошибка при добавлении сотрудника магазина:", err.message);
    } else {
      console.log(`Сотрудник магазина добавлен, ID: ${this.lastID}`);
    }
  });
}

add_product(name, price, type_of_measurement, measurement, img) {
  const sql = `
    INSERT INTO Products (Name, Priсe, Type_of_measurement, Measurement, Img)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, price, type_of_measurement, measurement, img], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара:", err.message);
    } else {
      console.log(`Товар добавлен, ID: ${this.lastID}`);
    }
  });
}

add_user_busket(id_user, id_product, quantity) {
  const sql = `
    INSERT INTO User_busket (Id_user, Id_product, Quantity)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [id_user, id_product, quantity], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара в корзину:", err.message);
    } else {
      console.log(`Товар добавлен в корзину, ID: ${this.lastID}`);
    }
  });
}

add_order(id_user_employee, id_user, pay_status, order_status, adress) {
  const sql = `
    INSERT INTO Orders (Id_user_employee, Id_user, pay_status, Order_status, Adress)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [id_user_employee, id_user, pay_status, order_status, adress], function (err) {
    if (err) {
      console.error("Ошибка при добавлении заказа:", err.message);
    } else {
      console.log(`Заказ добавлен, ID: ${this.lastID}`);
    }
  });
}

}

const d_b = new DB


export default d_b
// const hash = await HASH_FUNCTION.hashPassword("123")
// console.log(await HASH_FUNCTION.verifyPassword('123', hash))
// d_b.add_order(3,4,2,5,"ул. Карла Маркса 27")
// d_b.add_user("Елизовета","Каймасова",4,"lizok","123","88005553535")
// d_b.create_table();
// d_b.add_shop_point("Uhbkmybwf")
// console.log(await d_b.get_data("Shop_point", "Id", 4))
// console.log(await d_b.get_data("Order_statuses"))