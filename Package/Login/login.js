
$('#btn').on("click",function(){
    console.log("登录");
let passname={
    us :$('#us').val(),
    ps :$('#ps').val()
}
// console.log($('#us').val());
// console.log($('#ps').val());
$.ajax({
    url:"http://118.195.129.130:3000/user/login",
    type:"post",
    data:passname,
    dataType:"json",
    success:function(msg){
        console.log(msg);
        alert("登录成功")
    },
    error:function(msg){
        console.log(msg);
         alert("用户名或密码错误")
    }
})
})
//注册页面弹窗
let sign=document.getElementById('signIn')
    $('#block').on("click",function(){
    sign.style.display = "block";
    })
    $("#signBtn").click(function(){
        console.log("注册");
        if($('#usin').val().length<3){
            return alert("账户名不能小于三位字符")
        }
        if($('#psin').val().length<3){
            return alert("账户名密码不能小于三位字符")
        }
          sign.style.display = "none";
          alert("注册成功")
let passname={
        usin :$('#usin').val(),
        psin :$('#psin').val(),
        emailin :$('#emailin').val(),
        code :$('#code').val()
    } 
    console.log(passname);
    $.ajax({
            url:"http://118.195.129.130:3000/user/reg",
            type:"post",
            data:passname,
            dataType:"json",
            success:function(msg){
                console.log(msg);
                console.log(1111);
                },
            error:function(msg){
                console.log(msg);
                alert("用户名已存在")
               }
            })
        
        })
        $("#cancel").on("click",function(){
        sign.style.display = "none";
        console.log("取消");
    })