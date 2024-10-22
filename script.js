// 模拟数据存储
let vehicleDatabase = {
    'TEST123': {
        plateNumber: 'TEST123',
        imageUrl: 'https://example.com/test-image.jpg',
        status: '已登记',
        registrationTime: '2023-04-20 10:00',
        remarks: '测试车辆'
    }
};

function search() {
    console.log("搜索函数被调用");
    const searchInput = document.getElementById('searchInput').value;
    console.log("搜索输入:", searchInput);

    if (searchInput.toLowerCase() === 'nsg') {
        console.log("检测到 'nsg'，显示登记页面");
        showRegistrationPage();
    } else {
        const vehicleInfo = getVehicleInfo(searchInput);
        console.log("获取到的车辆信息:", vehicleInfo);
        if (vehicleInfo) {
            console.log("显示车辆信息");
            displayVehicleInfo(vehicleInfo);
        } else {
            console.log("显示无结果");
            displayNoResult();
        }
    }
    // 不再清空搜索框
    // document.getElementById('searchInput').value = '';
}

function getVehicleInfo(plateNumber) {
    console.log("获取车辆信息:", plateNumber);
    return vehicleDatabase[plateNumber.toUpperCase()] || null;
}

function displayVehicleInfo(vehicleInfo) {
    document.getElementById('plateNumberInfo').textContent = vehicleInfo.plateNumber;
    document.getElementById('vehicleImageInfo').src = vehicleInfo.imageUrl;
    document.getElementById('vehicleStatusInfo').textContent = vehicleInfo.status;
    document.getElementById('registrationTimeInfo').textContent = vehicleInfo.registrationTime;
    document.getElementById('remarksInfo').textContent = vehicleInfo.remarks;
    showVehicleInfoPage();
}

function displayNoResult() {
    console.log("显示无结果页面");
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="no-result">
            <div class="icon-circle">
                <i class="fas fa-folder-open"></i>
            </div>
            <p>未查询到车辆信息</p>
        </div>
    `;
    resultDiv.style.display = 'flex';
    document.getElementById('vehicleInfoPage').style.display = 'none';
    document.getElementById('registrationPage').style.display = 'none';
}

function showVehicleInfoPage() {
    console.log("显示车辆信息页面");
    document.getElementById('vehicleInfoPage').style.display = 'block';
    document.getElementById('result').style.display = 'none';
}

function hideVehicleInfoPage() {
    document.getElementById('vehicleInfoPage').style.display = 'none';
    document.getElementById('result').style.display = 'flex';
}

function showRegistrationPage() {
    console.log("显示车辆信息登记页面");
    document.getElementById('registrationPage').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('vehicleInfoPage').style.display = 'none';
}

function hideRegistrationPage() {
    console.log("隐藏车辆信息登记页面");
    document.getElementById('registrationPage').style.display = 'none';
    document.getElementById('result').style.display = 'flex';
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const plateNumber = document.getElementById('plateNumber').value;
    const vehicleImage = document.getElementById('vehicleImage').files[0];
    const vehicleStatus = document.getElementById('vehicleStatus').value;
    const registrationTime = document.getElementById('registrationTime').value;
    const remarks = document.getElementById('remarks').value;

    // 创建一个 FileReader 对象来读取图片文件
    const reader = new FileReader();
    reader.onload = function(event) {
        // 将车辆信息存储到模拟数据库中
        vehicleDatabase[plateNumber.toUpperCase()] = {
            plateNumber: plateNumber,
            imageUrl: event.target.result, // 使用 base64 编码的图片数据
            status: vehicleStatus,
            registrationTime: registrationTime,
            remarks: remarks
        };

        alert(`车辆信息已成功登记：\n车牌号：${plateNumber}\n车辆状态：${vehicleStatus}\n登记时间：${registrationTime}\n备注：${remarks}`);
        hideRegistrationPage();
    };

    // 读取图片文件
    reader.readAsDataURL(vehicleImage);
});

function initPage() {
    displayNoResult();
}

// 页面加载完成后调用初始化函数
window.onload = initPage;

// 在文件末尾添加以下代码
console.log("脚本加载完成");
