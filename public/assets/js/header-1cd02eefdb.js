console.log("working");let dropDown=!1;$("#dropDown_icon").click(function(){(dropDown=!dropDown)?($("#dropDown_icon > i")[0].outerHTML='<i class="fa-solid fa-xmark"></i>',$("#list_container").css("display","flex")):($("#dropDown_icon > i")[0].outerHTML='<i class="fa-solid fa-bars"></i>',$("#list_container").css("display","none")),console.log(dropDown)});