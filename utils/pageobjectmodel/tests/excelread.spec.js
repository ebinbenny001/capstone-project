const {test} = require("@playwright/test");
const { readExcelData } = require("../utils/excelReader");

test("read testdata from excel", async ()=>{
    const users = await readExcelData("C:\\Users\\LENOVO\\Desktop\\users.xlsx");

    for(const user of users){
        console.log("Firstname:", user.Firstname);
        console.log("Lastname:", user.Lastname);
        console.log("Email:", user.Email);
    }
});