
// #เพิ่มเติม 
// #การสร้างตัวแปลแนะนำไปใช้# หากต้องการไปใช้งาน หากตัวแปลอยู่ในฟังชั่นจะใช้งานได้เฉพาะฟังชั่นเท่านั้น 
// แต่หาก ตัวแปลสร้างนอกฟังชั่น จะใช้ได้ทั้งในและนอกฟังชั่น  
// #Array propertiescและฟังชั่น 



// 1. หาต้องการ ทราบ ค่าในarray มีค่าเท่าไหร่ จะเขียนเป็นตัวอย่างแบบนี้ 

let colors = ["red,yellow,green"];
//เช็คสมาชิกใน array  .length
let counts = colors.length;
console.log(counts);
//เรียงลำดับตัวอักษร โดยใช้ฟังชั่น .sort()
let result = colors.sort();
console.log(result);
//
//เรียงลำดับตัวอักษร โดยใช้ฟังชั่น.reverse()
let result2 = colors.reverse();
console.log(result2);
// การเพิ่มสมาชิกเข้าไปต่อท้าย  ตัวอย่าง
colors.push("blue");
console.log(colors);
//การเข้าถึงสมาชิก array
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}
// การเข้าถึงโดยใช้งาน forEach
colors.forEach(data);

function data(color) {
    console.log("สีforEach:", color);
}
// แปลงArray เป็น String 
//.toString() แปลงเป็น String
let x = colors.toString();
console.log(typeof (x));
//.join(",") นำค่าแต่ละตัวมาแปลงค่า 
let z = colors.join(",");
console.log(z);
//ตรวจtyp 
console.log(typeof (colors));
//เอาตัวท้ายออก
let y = colors.pop();
console.log("y", y);
// การรวม array
let fruits = ["orange", "apple", "mango"];
let fruits2 = ["orange2", "apple2", "mango2"];
//ตัวอย่างการรวม array หากต้องการเพิ่มหรือรวม สามารถ 
//เพิ่มพารามิเตอร์เข้ามาได้เลย 
let result3 = fruits.concat(fruits2);
console.log(result3);
// การเรียงลำดับ ตัวเลขจากน้อยไปมาก ใน array ตัวอย่าง
let points = [20, -5, -2, 40, 100, -500, 150];

console.log(" points: " + points);
//น้อยไปมาก 
points.sort(function (a, b) {
    return a - b;
});
console.log(" pointsหลัง: " + points);
//มากไปน้อย 
points.sort(function (a, b) {
    return b - a;
});
console.log(" pointsหลัง: " + points);
// //  OBJECT 
// กำหนด กำหนดdata เป็นวัตถุ ตัวอย่าง 
let datas = {
    name: "golf",
    age: 32,
    city: "BKK"
};
//การเข้าถึงข้อมูล จะตั้งด้วย  data.name

console.log(datas.name);


// ฟังชั่นรับค่าส่งค่า ตัวอย่าง ด้านล่าง 
function myfunction(param, param) {
    console.log(param);
}
//ตัวแปล ที่ส่งค่าจะเรียก อากิวเม้น ส่วน ตัวรับค่าที่ฟังชั่นจะเรียก พารามิเตอร์ 
var c;
function a(x, y) {
    
    c = x * y;
    return c;
};

a(2,8);
console.log("เท่ากับ",c);
 
 // การเชื่อม html Dom ducument Object model
 //การเข้าถึงและเปลี่ยนสถานะต่างๆ ความการเปลี่ยนรูปแบบ 
//ตัวอย่าง การเข้าถึง 
const a = document.getElementById("ชื่อid ");
const b = document.getElementsByClassName("ชื่อคราส");
const c = document.getElementsByTagName("body");
a.innertext = "golf"; เปลี่ยนข้อความ
Domnode 



