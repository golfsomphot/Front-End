//ตัวอย่างการเขียน แบบ callback

// function cal(a, b, callback) {
//     const sum = a + b;
//     callback(sum)
// }

// cal(20, 40, function (result) {
//     console.log(`ผลรวมคือ :${result}`)
// })



// ตัวอย่างการเขียนแบบ Promise
const cn = true;
const url1 = 'http://golf'
function downloading(url) {
    return new Promise(function (resolve, reject) {
        console.log(`กำลังโหลด ${url}`)
        setTimeout(() => {
            if (cn) {
                resolve(`โหลด ${url} เรียบร้อยแล้ว`);
            } else {
                reject(`เกิดข้อผิดพลาด`);
            }
        }, 3000);

    });
}
downloading(url1).then(result => {
    console.log("result:", result)
}).catch((err) => {
    console.log("err:", err)
}).finally(() => {
    console.log("จบการทำงาน")
});
// การเขียนแบบ Async / Await//
async function start() {
    console.log(await downloading(url1));
}
start()