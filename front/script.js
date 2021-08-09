var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

$(document).ready(function () {
  $("#email").inputmask("email");
  $("#number").inputmask({
    mask: "+7(###)-###-##-##",
    greedy: false,
    definitions: { "#": { validator: "[0-9]", cardinality: 1 } }
  });
  $(".page > p").click(function () {
    $("html,body").animate(
      {
        scrollTop: $("." + $(this).attr("data-top")).offset().top - 64 + "px"
      },
      1000
    );
  });
  $(".services_icon .div1").click(function () {
    $(".live  > div").hide("slide");
    $(".live .images").show("slide");
    $(".live .page2").show("slide");
  });
  $(".services_icon .div2").click(function () {
    $(".live > div").hide("slide");
    $(".live .us2").show("slide");
    $(".live .us2").css({ display: "flex" });
  });
  $(".services_icon .div3").click(function () {
    $(".live > div").hide("slide");
    $(".live .us3").show("slide");
    $(".live .us3").css({ display: "flex" });
  });
  $(".services_icon .div4").click(function () {
    $(".live > div").hide("slide");
    $(".live .us4").show("slide");
    $(".live .us4").css({ display: "flex" });
  });
  $(".button_sendformhover").hover(
    function () {
      $(this).css({
        boxShadow: "0px 0px 7px 1px rgb(8 42 62 / 80%)",
        transition: "all 0.2s linear"
      });
    },
    function () {
      $(this).css({
        boxShadow: "",
        transition: "all 0.2s linear"
      });
    }
  );
  $(".start .div1 > p").hover(
    function () {
      $(this).css({
        color: "blue",
        transition: "all 1s linear"
      });
    },
    function () {
      $(this).css({
        color: "white",
        transition: "all 1s linear"
      });
    }
  );
});
$(document).on("scroll", function () {
  let top = $(document).scrollTop();
  let navbar = $(".navbar_").height();
  if (top > navbar) {
    $(".nav_logo").css({
      display: "none"
    });
    $(".navbar_").css({
      background: "linear-gradient(273.34deg, #ed1c23 0.51%, #f26d21 100%)",
      width: "70%",
      height: "39px",
      top: "18px",
      justifyContent: "",
      padding: "0"
      //   display: "block"
    });
    $(".p_logo_navbar").css({
      display: "block"
    });
    $(".page").css({
      width: "50%"
    });
    $(".info_navbar").css({
      width: "50%"
    });
    $(".logo_tel").css({
      opacity: "0",
      transition: ""
    });
  } else {
    $(".nav_logo").css({
      display: ""
    });
    $(".navbar_").css({
      background: "",
      width: "100%",
      height: "64px",
      top: "32px",
      padding: "10px",
      justifyContent: "space-between"
    });
    $(".p_logo_navbar").css({
      display: "none"
    });
    $(".page").css({
      width: "30%"
    });
    $(".info_navbar").css({
      width: "38%"
    });
    $(".logo_tel").css({
      transition: "all 2s linear",
      transitionDuration: "2s",
      opacity: "1"
    });
  }
});
