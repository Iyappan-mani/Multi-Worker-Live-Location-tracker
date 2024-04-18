import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";




const SQLite = () => {
    const db = openDatabase({
        name: "rn_sqlite",
    });
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [Location, setLocation] = useState("");
    const [SelectedItem, setSelectedItem] = useState(null);

    const createTables = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), location VARCHAR(30),amount VARCHAR(20))`,
                [],
                (sqlTxn, res) => {
                    console.log("table created successfully");
                },
                error => {
                    console.log("error on creating table " + error.message);
                },
            );
        });
    };

    const addCategory = () => {
        if (!category) {
            alert("Enter category");
            return false;
        }
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO categories (name,location,amount,id) VALUES (?,?,?,?)`,
                [category, Location, 0],
                (sqlTxn, res) => {

                    getCategories();
                    setCategory("");
                    setLocation("")
                },
                error => {
                    console.log("error on adding category " + error.message);
                },
            );
        });
    };

    const getCategories = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM categories ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    console.log("categories retrieved successfully");
                    let len = res.rows.length;

                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item.id, name: item.name, location: item.location, amount: item.amount });
                        }

                        setCategories(results);
                    }else setCategories([]);
                },
                error => {
                    console.log("error on getting categories " + error.message);
                },
            );
        });
    };

    const handleDelete = (id) => {
        console.log(id);
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM categories WHERE id = ?`,
                [id],
                (sqlTxn, res) => {
                    console.log("Category deleted successfully");
                    getCategories(); // Refresh the categories list after deletion
                },
                error => {
                    console.log("Error deleting category: " + error.message);
                }
            );
        });
    };

    const updateData = async () => {
        const query_update = 'UPDATE categories SET name = ?, location = ?, amount = ? WHERE id = ?';
        const params = [category, Location, 1, SelectedItem.id];
        try {
            await db.transaction(txn => {
                txn.executeSql(
                    query_update,
                    params,
                    (sqlTxn, res) => {
                        console.log("Data updated successfully");
                        getCategories(); // Refresh the categories list
                        setCategory("");
                        setLocation("");
                        setSelectedItem(null); // Reset selected item after updating
                    },
                    error => {
                        console.log("Error updating data: " + error.message);
                    }
                );
            });
        } catch (err) {
            console.log('Error updating data:', err);
        }
    };





    const renderCategory = ({ item }) => {
        return (
            <View style={{
                flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: "#ddd",
            }}>
                <Text style={{ marginRight: 9 }}>{item.id}</Text>
                <Text style={{ marginRight: 9 }}>{item.name}</Text>
                <Text style={{ marginRight: 9 }}>{item?.location}</Text>
                <Text style={{ marginRight: 20 }}>{item?.amount}</Text>

                <Button title="Edit" onPress={() => { setSelectedItem(item), setCategory(item.name), setLocation(item?.location) }} />
                <View style={{ width: 10 }} />
                <Button title="Delete" color={"red"} onPress={() => {handleDelete(item?.id) }} />
            </View>
        );
    };

    useEffect(async () => {
       
        await createTables();
        await getCategories();
    }, []);

    return (
        <View>
            <StatusBar backgroundColor="#222" />

            <TextInput
                placeholder="Enter category"
                value={category}
                onChangeText={setCategory}
                style={{ marginHorizontal: 8 }}
            />
            <TextInput
                placeholder="Enter Location"
                value={Location}
                onChangeText={setLocation}
                style={{ marginHorizontal: 8 }}
            />

            <Button title="Submit" onPress={SelectedItem == null ? addCategory : updateData} />

            <FlatList
                data={categories}
                renderItem={renderCategory}
                key={cat => cat.id}
            />
        </View>
    );
};

export default SQLite;