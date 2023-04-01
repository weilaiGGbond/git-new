const body = document.querySelector('.body');
const addAll = document.querySelector('.addAll');
const editAll = document.querySelector('.editAll');
//删除用户
function del(a) {
    let sure = confirm("你确定删除吗?");
    if (sure == true) {
        let ula = a.parentNode.parentNode;
        let id = ula.lastElementChild.innerHTML;
        a.parentNode.parentNode.remove();
        $.ajax({
            url: "http://118.195.129.130:3000/food/del",
            type: 'post',
            data: {
                _id: id
            },
            dataType: 'json',
            success: function (msg) {
                console.log(msg);
            }
        })
    } else {
        return false
    }
}
/*--------------------------------------------------------------------------------*/
//添加用户
///^(0|([1-9]\d*))(\.\d+)?$/
let Add = document.getElementById("add")
let addAlter = document.getElementById("addAlter")
let addCancel = document.getElementById("addCancel")
Add.onclick = function () {
    addAll.style.display = "block";
    addCancel.onclick = function () {
        addAll.style.display = "none";
        document.querySelector(".name").value = "";
        document.querySelector(".price").value = "";
        document.querySelector(".desc").value = "";
        document.querySelector(".typename").value = "";
        document.getElementById('typeid').value = "choose";
    };
    addAlter.onclick = function () {
        addAll.style.display = "none";
        let name = document.querySelector(".name").value;
        let price = document.querySelector(".price").value;
        let desc = document.querySelector(".desc").value;
        let typename = document.querySelector(".typename").value;
        let typeid = 0;
        let index = document.getElementById("typeid").selectedIndex;
        console.log(index, document.getElementById('typeid').value);
        typeid = document.getElementById('typeid').value
        let typestate = "其他";
        if (typeid == 0) {
            typestate = '面'
        } else if (typeid == 1) {
            typestate = '米'
        } else if (typeid == 2) {
            typestate = '饮品'
        } else if (typeid == 3) {
            typestate = '水果'
        }else {
            typestate = "其他"
        }
        let patt =/^(0|([1-9]\d*))(\.\d+)?$/;
        console.log("判断", patt.test(price));
        if (!patt.test(price)) {
            alert("价格只能输入正数")
        } else {
            let sure = confirm('确定添加吗？')
            if (sure == true) {
                console.log(111);
                $.ajax({
                    url: 'http://118.195.129.130:3000/food/add',
                    type: "post",
                    data: {
                        name: name,
                        price: price,
                        desc: desc,
                        typename: typename,
                        typeid: typeid
                    },
                    success: function (msg) {
                        console.log(msg);
                        body.innerHTML += `
                <ul>
                        <li>${name}</li>
                        <li>${price}</li>
                        <li>${desc}</li>
                        <li>${typename}</li>
                        <li>${typestate}</li>
                        <li>
                            <span class="edit"onclick="check(this)">编辑</span>
                            <span class="del" onclick='del(this)'>删除</span>
                        </li>
                    </ul>`
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                })
            } else {
                return false;
            }
        }
        document.querySelector(".name").value = "";
        document.querySelector(".price").value = "";
        document.querySelector(".desc").value = "";
        document.querySelector(".typename").value = "";
        document.getElementById('typeid').value = "choose";
    }
}
/*-------------------------------------------------------------------------------------------------------*/
//查询用户
let search = document.getElementById("search")
search.onclick = function () {
    let refer = document.getElementById("btn").value;
    $.ajax({
        url: 'http://118.195.129.130:3000/food/getInfoByKw',
        type: "post",
        data: {
            kw: refer
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            if (msg.data.length == 0) {
                alert("查询结果为空")
                document.getElementById("btn").value = ""
            } else {
                body.innerHTML = " ";
                let typestate = '其他'
                for (let a = 0; a < msg.data.length; a++) {
                    if (msg.data[a].typeid == 0) {
                        typestate = '面'
                    } else if (msg.data[a].typeid == 1) {
                        typestate = '米'
                    } else if (msg.data[a].typeid == 2) {
                        typestate = '饮品'
                    } else if (msg.data[a].typeid == 3) {
                        typestate = '水果'
                    }
                    body.innerHTML += `<ul>
                    <li>${msg.data[a].name}</li>
                    <li>${msg.data[a].price}</li>
                    <li>${msg.data[a].desc}</li>
                    <li>${msg.data[a].typename}</li>
                    <li>${typestate}</li>
                <li><span class="edit" onclick='check(this)'>编辑</span>
                    <span class="del" onclick='del(this)'>删除</span></li>
                    <li style="display :none;">${msg.data[a]._id}</li>
                </ul>`
                }
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
}
/*编辑用户--------------------------------------------------------------------------------------------*/
function check(a) {
    let editAlter = document.getElementById("editAlter")
    let editCancel = document.getElementById("editCancel")
    editAll.style.display = "block";
    editAlter.onclick = function () {
        editAll.style.display = "none";
        let name = document.querySelector(".editname").value;
        let price = document.querySelector(".editprice").value;
        let desc = document.querySelector(".editdesc").value;
        let typename = document.querySelector(".edittypename").value;
        let typeid = 0;
        let index = document.getElementById("edittypeid").selectedIndex;
        console.log(index, document.getElementById('edittypeid').value);//0,choose
        typeid = document.getElementById('edittypeid').value
        let typestate = "其他";
        if (typeid == 0) {
            typestate = '面'
        } else if (typeid == 1) {
            typestate = '米'
        } else if (typeid == 2) {
            typestate = '饮品'
        } else if (typeid == 3) {
            typestate = '水果'
        }
        console.log(typestate);
        console.log(typeid);
        let patt = /^(0|([1-9]\d*))(\.\d+)?$/;
        console.log(patt.test(price));
        if (!patt.test(price)) {
            alert("价格只能输入正数");
        } else {
            let sure = confirm('确定修改吗？')
            if (sure == true) {
                let ula = a.parentNode.parentNode;
                console.log(a);
                let lia = ula.getElementsByTagName('li');
                let id = ula.lastElementChild.innerHTML;
                $.ajax({
                    url: 'http://118.195.129.130:3000/food/update',
                    type: "post",
                    data: {
                        name: name,
                        price: price,
                        desc: desc,
                        typename: typename,
                        typeid: typeid,
                        _id: id
                    },
                    success: function (msg) {
                        console.log(msg);
                        lia[0].innerHTML = name;
                        lia[1].innerHTML = price;
                        lia[2].innerHTML = desc;
                        lia[3].innerHTML = typename;
                        lia[4].innerHTML = typestate;
                        lia[6].innerHTML = id
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                })
            } else {
                return false;
            }
        }
        document.querySelector(".editname").value = "";
        document.querySelector(".editprice").value = "";
        document.querySelector(".editdesc").value = "";
        document.querySelector(".edittypename").value = "";
        document.getElementById('edittypeid').value = "choose"
    }
    editCancel.onclick = function () {
        editAll.style.display = "none";
        document.querySelector(".editname").value = "";
        document.querySelector(".editprice").value = "";
        document.querySelector(".editdesc").value = "";
        document.querySelector(".edittypename").value = "";
        document.getElementById('edittypeid').value = "choose"
    };
    console.log(document.querySelector(".edittypename").value);
}
/*分页查询-----------------------------------------------------------------*/
let num = 1;
let pages = document.getElementById("page")
let next = document.getElementById("next")
let prv = document.getElementById("prv")
next.onclick = function () {
    num++;
    console.log(pages.innerText);
    fn(num, 5)
}
prv.onclick = function () {
    console.log(num);
    if (num == 1) {
        alert("已经是第一页了");
    } else {
        num--;
        pages.innerText = `第${num}页`
        fn(num, 5)
    }
}
function fn(page, per_page) {
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
            if (msg.data.length != 0) {
                body.innerHTML = " ";
                pages.innerText = `第${page}页`
                let typestate = '其他'
                for (let a = 0; a < msg.data.length; a++) {

                    if (msg.data[a].typeid == 0) {
                        typestate = '面'
                    } else if (msg.data[a].typeid == 1) {
                        typestate = '米'
                    } else if (msg.data[a].typeid == 2) {
                        typestate = '饮品'
                    } else if (msg.data[a].typeid == 3) {
                        typestate = '水果'
                    }
                    body.innerHTML += `<ul>
                     <li>${msg.data[a].name}</li>
                     <li>${msg.data[a].price}</li>
                     <li>${msg.data[a].desc}</li>
                     <li>${msg.data[a].typename}</li>
                     <li>${typestate}</li>
                 <li><span class="edit" onclick='check(this)'>编辑</span>
                     <span class="del" onclick='del(this)'>删除</span></li>
                     <li style="display:none;">${msg.data[a]._id}</li>
                 </ul>`
                }

            } else {
                alert("已经是最后一页了");
            }

        },
        error: function (msg) {
            console.log(msg);
        }
    })
}
fn(1, 5)
//获取总页数
let total = document.getElementById("total")
$.ajax({
    url: 'http://118.195.129.130:3000/food/allpage',
    type: "get",
    dataType: "json",
    success: function (msg) {
        console.log(msg);
        let sum = Math.ceil(msg.pages / 5);
        total.innerText = `共${sum}页`
    }, error: function (msg) {
        console.log(msg);
    }
})
//左边框文字的点击事件
//点击登陆页面时发生跳转
let backLogin = document.querySelector("#backLogin");
let shop = document.querySelector("#shop");
let list = document.querySelector("#list");
let masterManage = document.querySelector("#masterManage");
let time = 3;
backLogin.onclick = function () {
    backLogin.style.background = "#fff"
    backLogin.style.color = "#a1afc9"
    let Time = setInterval(function () {
        if (time == 0) {
            clearInterval(Time)
            location.href = "../test/index.html";
        } else {
            time--;
        }
    }, 1000)
}
let Ptext = document.querySelectorAll('.text p');
for (let i = 0; i < Ptext.length; i++) {
    Ptext[i].onclick = function () {
        for (let i = 0; i < Ptext.length; i++) {
            Ptext[i].style.backgroundColor = "#a1afc9";
        }
        this.style.backgroundColor = '#fff';
    }
}

let master = document.querySelector(".master")
let headshot = document.querySelector(".headshot img")
headshot.onmouseover = function () {
    master.style.display = "block"
}
master.onmouseleave = function () {
    master.style.display = "none"
}
//退出登录
let out = document.getElementById("out")
out.onclick = function () {
    $.ajax({
        url: 'http://118.195.129.130:3000/user/out',
        type: "post",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            alert("已退出")
            alert(`将在3秒后返回登录页面`)
            let Time = setInterval(function () {
                if (time == 0) {
                    clearInterval(Time)
                    location.href = "../test/index.html";
                } else {
                    time--;

                }
            }, 1000)
        }
        , error: function (msg) {
            console.log(msg);
        }
    })
}

