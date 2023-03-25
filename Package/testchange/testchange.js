const body = document.querySelector('.body');
const addAll = document.querySelector('.addAll');
//删除用户
function del(a) {
    console.log("删除", a.parentNode.parentNode);
    a.parentNode.parentNode.remove();
    $.ajax({
        url: "http://118.195.129.130:3000/food/del",
        type: 'post',
        dataType: 'json',
        success: function (msg) {
            console.log(msg);
        }
    })
}
//添加用户
$('.add').click(function (){
    addAll.style.display = "block";
    $('#cancel').click(function () {
        addAll.style.display = "none";
    });
    
        $('#alter').off('click')
        $('#alter').click(function () {
            addAll.style.display = "none";
            let name = $('.name').val();
        let price = $('.price').val();
        let desc = $('.desc').val();
        let typename = $('.typename').val();
        console.log(name);
            $(".body").append(`
            <ul>
                <li>
                    <input type="checkbox">
                    </li>
                    <li>${name}</li>
                    <li>${price}</li>
                    <li>${desc}</li>
                    <li>${typename}</li>
                    <li>
                        <span class="edit"onclick="check(this)">编辑</span>
                        <span class="del" onclick='del(this)'>删除</span>
                    </li>
                </ul>
            `)
        })
        $.ajax({
            url: 'http://118.195.129.130:3000/food/update',
            type: "post",
            data: {
                name: $(".name ").val(),
                price: $(".price").val(),
                desc: $(".desc").val(),
                typename: $(".typename").val()
            },
            success: function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        })
       
})
/*-------------------------------------------------------------------------------------------------------*/
//查询用户
$("#search").click(function () {
    let refer = $('#btn').val();
    body.innerHTML = " ";
    $.ajax({
        url: 'http://118.195.129.130:3000/food/getInfoByKw',
        type: "post",
        data: {
            kw:refer
        },
        dataType: "json",
        success: function (msg) {
            //   msg = JSON.stringify(msg); 
            // console.log(msg);
            console.log(msg);
            for (let a = 0; a < msg.data.length; a++) {
                body.innerHTML += `<ul>
               <li><input type="checkbox"></li>
                <li>${msg.data[a].name}</li>
                <li>${msg.data[a].price}</li>
                <li>${msg.data[a].desc}</li>
                <li>${msg.data[a].typename}</li>
            <li><span class="edit" onclick='check(this)'>编辑</span>
                <span class="del" onclick='del(this)'>删除</span></li>
            </ul>`
            }

        },
        error: function (msg) {
            console.log(msg);
        }
    })
})
//编辑用户
function check(a) {
    console.log('获取', a.parentNode.parentNode);
    addAll.style.display = "block";
    $('#alter').click(function (){
        addAll.style.display = "none";
        let name = $('.name').val();
        let price = $('.price').val();
        let desc = $('.desc').val();
        let typename = $('.typename').val();
        let ula=a.parentNode.parentNode;
        // let lia=ula.getElementsByTagName('ul');
        // console.log("lia",lia);
        /*lia*/
        ula.innerHTML= `
            <li>
             <input type="checkbox">
                </li>
                 <li>${name}</li>
                 <li>${price}</li>
                <li>${desc}</li>
                 <li>${typename}</li>
                <li>
                    <span class="edit" onclick="check(this)">编辑</span>
                    <span class="del" onclick='del(this)'>删除</span>
                 </li>
                `
        $.ajax({
            url: 'http://118.195.129.130:3000/food/update',
            type: "post",
            data: {
                name: $(".name ").val(),
                price: $(".price").val(),
                desc: $(".desc").val(),
                typename: $(".typename").val()
            },
            success: function (msg) {
                console.log(msg);
                // lia[1].innerHTML=name;
                // lia[2].innerHTML=price;
                // lia[3].innerHTML=desc;
                // lia[4].innerHTML=typename;
            },
            error:function(msg){
                console.log(msg);
            }
        })
    })
    $('#cancel').click(function () {
        addAll.style.display = "none";
    });
}
//分页查询
let num = 1;
let pages = document.getElementById("page")
$('#next').click(function(){
      num++;
        console.log(page.innerText);
        // page.innerText = `第${num}页`
    // if(num>=9){
    //     alert("已经是最后一页了");
    // }
    fn(num,5)
})
$('#prv').click(function(){
    console.log(num);
    if(num==5){
        alert("已经是第一页了");
    }else{
        num--;
        pages.innerText = `第${num}页`
        fn(num,5)
    }
})
function fn(page,per_page){
    $.ajax({
        url: 'http://118.195.129.130:3000/food/getInfoByPage',
        type: "post",
        data: {
           page,
           per_page,
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            if(msg.data.length!=0){
                body.innerHTML =" ";
                pages.innerText = `第${page}页`
                for (let a = 0; a < msg.data.length; a++) {
                    body.innerHTML += `<ul>
                    <li><input type="checkbox"></li>
                     <li>${msg.data[a].name}</li>
                     <li>${msg.data[a].price}</li>
                     <li>${msg.data[a].desc}</li>
                     <li>${msg.data[a].typename}</li>
                 <li><span class="edit" onclick='check(this)'>编辑</span>
                     <span class="del" onclick='del(this)'>删除</span></li>
                 </ul>`
                 }
            }else{
                alert("已经是最后一页了"); 
            }

        },
         error:function(msg){
            console.log(msg);
        }
})
}
fn(1,5)