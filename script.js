// Firebase 配置
const firebaseConfig = {
    // 在这里粘贴您的 Firebase 配置
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 获取 Firestore 实例
const db = firebase.firestore();

// 搜索函数
async function search() {
    console.log("搜索函数被调用");
    const searchInput = document.getElementById('searchInput').value;
    console.log("搜索输入:", searchInput);

    if (searchInput.toLowerCase() === 'nsg') {
        console.log("检测到 'nsg'，显示登记页面");
        showRegistrationPage();
    } else {
        try {
            const vehicleInfo = await getVehicleInfo(searchInput);
            if (vehicleInfo) {
                console.log("显示车辆信息");
                displayVehicleInfo(vehicleInfo);
            } else {
                console.log("显示无结果");
                displayNoResult();
            }
        } catch (error) {
            console.error("搜索出错:", error);
            alert("搜索时发生错误，请稍后再试。");
        }
    }
}

// 从 Firestore 获取车辆信息
async function getVehicleInfo(plateNumber) {
    const docRef = db.collection('vehicles').doc(plateNumber.toUpperCase());
    const doc = await docRef.get();
    return doc.exists ? doc.data() : null;
}

// 显示车辆信息（保持不变）

// 显示无结果（保持不变）

// 显示车辆信息页面（保持不变）

// 隐藏车辆信息页面（保持不变）

// 显示登记页面（保持不变）

// 隐藏登记页面（保持不变）

// 修改注册表单提交处理程序
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const plateNumber = document.getElementById('plateNumber').value;
    const vehicleImage = document.getElementById('vehicleImage').files[0];
    const vehicleStatus = document.getElementById('vehicleStatus').value;
    const registrationTime = document.getElementById('registrationTime').value;
    const remarks = document.getElementById('remarks').value;

    try {
        // 创建一个 FileReader 对象来读取图片文件
        const reader = new FileReader();
        reader.onload = async function(event) {
            const vehicleData = {
                plateNumber: plateNumber,
                imageUrl: event.target.result,
                status: vehicleStatus,
                registrationTime: registrationTime,
                remarks: remarks
            };

            // 将车辆信息存储到 Firestore
            await db.collection('vehicles').doc(plateNumber.toUpperCase()).set(vehicleData);

            alert(`车辆信息已成功登记：\n车牌号：${plateNumber}\n车辆状态：${vehicleStatus}\n登记时间：${registrationTime}\n备注：${remarks}`);
            hideRegistrationPage();
        };

        // 读取图片文件
        reader.readAsDataURL(vehicleImage);
    } catch (error) {
        console.error("注册车辆信息时出错:", error);
        alert("注册车辆信息时发生错误，请稍后再试。");
    }
});

// 初始化页面（保持不变）

// 页面加载完成后调用初始化函数（保持不变）

console.log("脚本加载完成");
