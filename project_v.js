
    let orders = []
    var menu1cnt1 = 0;
    var menu1cnt2 = 0;
    var menu1cnt3 = 0;

    $(document).ready(function(){
        $("#tabs").tabs()
        //문서시작할때 실행 오키?
        const url = $("#first").data("url")
        $.getJSON(url,function(arr){
            console.log(arr)
            menuList(arr)
        })//getJSON


    })
    $("#tabs #first").on("click", function (e){
        e.preventDefault()
        e.stopPropagation()
        //e.target.getAttribute("data-url")
        const url = $(e.target).data("url")
        $.getJSON(url,function(arr){
            console.log(arr)
            menuList(arr)
        })//getJSON


    })// click

    $("#tabs #second").on("click", function (e){
        e.preventDefault()
        e.stopPropagation()
        //e.target.getAttribute("data-url")
        const url = $(e.target).data("url")
        $.getJSON(url,function(arr){
            console.log(arr)
            menuList2(arr)

        })//getJSON
      })// click
        $("#tabs #third").on("click", function (e){
            e.preventDefault()
            e.stopPropagation()
            //e.target.getAttribute("data-url")
            const url = $(e.target).data("url")
            $.getJSON(url,function(arr){
                console.log(arr)
                menuList3(arr)

            })//getJSON

    })// click

    function menuList(arr) {
        const menuList = document.querySelector(".coffee") // menuList 변수에 class가 .menuList인 태그 주소를 넣는다.
        let str = '' //값을 유지하기 위해 전역변수 선언

        for (let i = 0; i < arr.length; i++) {
            const menu = arr[i]
            console.log(arr[i])
            str += `  <div class="col">
                <div coffee-idx="${i}">
                  <img src = "${menu.picture}">
                  <div class="card-body">
                    <div>${menu.name}</div>
                    <div>${menu.price}</div>
                  </div>
                </div>
              </div>`
        }
        menuList.innerHTML = str
        if(menu1cnt1 <=0){
            menuList.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()

                const target = e.target
                const divEle = target.closest("div")
                const idx = divEle.getAttribute("coffee-idx")
                const menu = arr[idx]


                bill(menu)
            }, false)
            menu1cnt1++
        }





    }


    function menuList2 (arr){
        const menuList2 = document.querySelector(".flatccino") // menuList 변수에 class가 .menuList인 태그 주소를 넣는다.
        let str2 = '' //값을 유지하기 위해 전역변수 선언
        for (let i = 0; i < arr.length; i++) {
            const menu = arr[i]
            str2 += `  <div class="col">
                <div flatccino-idx="${i}">
                  <img src = "${menu.picture}">
                  <div class="card-body">
                    <div>${menu.name}</div>
                    <div>${menu.price}</div>      
                  </div>
                </div>
              </div>`

        }
        menuList2.innerHTML = str2

        if(menu1cnt2 <=0) {
            menuList2.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()

                const target = e.target
                const divEle = target.closest("div")
                const idx = divEle.getAttribute("flatccino-idx")
                const menu = arr[idx]
                bill(menu)


            }, false)
            menu1cnt2++
        }
    }

    function menuList3 (arr){
        const menuList3 = document.querySelector(".dessert") // menuList 변수에 class가 .menuList인 태그 주소를 넣는다.
        let str3 = '' //값을 유지하기 위해 전역변수 선언
        for (let i = 0; i < arr.length; i++) {
            const menu = arr[i]
            str3 += `<div class="col">
                <div dessert-idx="${i}">
                  <img src = "${menu.picture}">
                  <div class="card-body "
                    <div>${menu.name}</div>
                    <div>${menu.price}</div>
                  </div>
                </div>
              </div>`

        }
        menuList3.innerHTML = str3

        if(menu1cnt3 <=0) {
            menuList3.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()

                const target = e.target
                const divEle = target.closest("div")
                const idx = divEle.getAttribute("dessert-idx")
                const menu = arr[idx]


                bill(menu)


            }, false)
            menu1cnt3++
        }
    }

    function bill(menu){

    // 이 경우만 남긴 후 result에 저장
    const result = orders.filter(oi => oi.name === menu.name)

    console.log("-------check result-----------")
    console.log(result)
    // result는 리모콘이므로 result[0]은 곧 중복값이 있던 orders[아무개]가 됨

    if(result.length > 0){
    result[0].qty += 1

}else {
    orders.push({...menu, qty:1})
}

    console.log(orders)
    showOrderItems()

}



function showOrderItems() {
    console.log("오냐?");
        const orderListEle = document.querySelector(".orderlist")
        let str = ''
        let sum = 0

        for (let i = 0; i < orders.length; i++) {

        const orderItem = orders[i]

        str += `<ol class="list-group list-group-numbered">
      <div class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${orderItem.name}</div>
          ${orderItem.price}
        </div>
        <span class="badge bg-primary rounded-pill">${orderItem.qty}</span>
      </div>
    </ol>`
        sum += orderItem.price * orderItem.qty
    }
        str += `<ul class="list-group list-group-flush" style="float:right">
      <li class="list-group-item">총계 : ${sum}</li>`
        orderListEle.innerHTML = str
    }