//登录页面
//显示密码（登陆页面）
let imglogin = document.querySelector(".showimg");
let ps = document.getElementById("ps")
let flag = 0
// console.log("imglogin", imglogin);

imglogin.onclick = function () {
    console.log(imglogin);
    if (flag == 0) {

        imglogin.src = "img/openEye.png";
        ps.type = "text";
        flag = 1;
    } else {

        imglogin.src = "img/closeEye.png";
        ps.type = "password";
        flag = 0;
    }
}
$('#btn').on("click", function () {
    console.log("登录");
    let passname = {
        us: $('#us').val(),
        ps: $('#ps').val()
    }
    $.ajax({
        url: "http://118.195.129.130:3000/user/login",
        type: "post",
        data: passname,
        dataType: "json",
        success: function (msg) {
            console.log("登录成功", msg);
            if (msg.err == 0) {
                console.log("登录成功", msg);
                alert("登录成功")
                location.href = "../testchange/testchange.html";
                
            } else {
                alert("用户名或密码错误")
            }
        },
        error: function (msg) {
            console.log(msg);
            alert("用户名或密码错误")
        }
    })
})
//注册页面弹窗
//显示密码（注册页面）
// ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
let imgs = document.querySelector(".signShow")
console.log(imgs);
let psin = document.getElementById("psin")
imgs.onclick = function () {
    console.log(111);
    if (flag == 0) {
        imgs.src = "img/openEye.png";
        psin.type = "text";
        flag = 1;
    } else {
        imgs.src = "../test/img/closeEye.png";
        psin.type = "password";
        flag = 0;
    }
}
let sign = document.getElementById('signIn')
$('#block').on("click", function () {
    sign.style.display = "block";
})



$("#signBtn").click(function () {
    // console.log("注册");
    if ($('#usin').val().length < 3) {
        return alert("账户名不能小于三位字符")
    }
    if ($('#psin').val().length < 3) {
        return alert("账户名密码不能小于三位字符")
    }
    if ($('#emailin').val().length < 3) {
        return alert("账户名邮箱不能小于三位字符")
    }
    sign.style.display = "none";
    alert("注册成功")
    let passname = {
        usin: $('#usin').val(),
        psin: $('#psin').val(),
        emailin: $('#emailin').val(),
        code: $('#code').val()
    }
    console.log(passname);
    $.ajax({
        url: "http://118.195.129.130:3000/user/reg",
        type: "post",
        data: passname,
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            console.log(1111);
        },
        error: function (msg) {
            console.log(msg);
            alert("用户名已存在")
        }
    })

})
$("#cancel").on("click", function () {
    sign.style.display = "none";
    console.log("取消");
})

let time = 25;
let codebtn = document.getElementById("codebtn");
codebtn.onclick = function () {
    // var btnTime;
    // clearInterval(btnTime)
    if (($('#usin').val().length < 3) ||
        ($('#psin').val().length < 3) ||
        ($('#emailin').val().length < 3)) {
        return alert("账户格式输入不合法")
    } else {
        let emailJudge = document.querySelector("#emailin").value;
        let patt = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!patt.test(emailJudge)) {
           return alert("邮箱格式输入不合法")
        } else {
            let btnTime = setInterval(function () {
                if (time == 0) {
                    clearTimeout(btnTime)
                    //清除定时器
                    codebtn.disabled = false;
                    codebtn.innerHTML = "获取"
                    time = 25;
                    codebtn.style.background = "cornflowerblue";
                } else {
                    codebtn.disabled = true;
                    codebtn.innerHTML = `获取(${time})`
                    codebtn.style.background = "gray";
                    time--;
                }
            }, 1000)
        }
        //禁用按钮
        
    }
}
