var circlestop = false;
var stopprint = false;
var logoMinizred = false;
var textSpeed = 15;
var lang="EN";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function () {
    //circle("ind2",0);
    $("#logo_img").fadeOut(1);
    $("#strategy").html(Lang("hStrategy").toUpperCase());
    $("#creative").html(Lang("hCreative").toUpperCase());
    $("#web").html(Lang("hWeb").toUpperCase());
    $("#advertising").html(Lang("hAdvertising").toUpperCase());


    $("#logo_img").fadeIn(1000,function(){
        drawMenu(function(){
            setTimeout(function(){ drawWho(function(){ drawLang() }); },1000);
        });
    });
});

$("#cross img").click(function () {
    $("#panel").animate({'top': '120%' }, 700, function () { });
});

$("#lang").click(function(){

    StopAllTimers();
    $("#ihead").html("");
    $("#ibody").html("");
    $("#icontact").html("");

    if(lang=="EN") { lang="RUS"; $("#lang").html("EN"); }
    else{ lang="EN"; $("#lang").html("RUS"); }

    $("#lang").css('top', '-5%');
    logoMinizred=true;
    BackLogo(function(){
        $("#strategy").html(Lang("hStrategy").toUpperCase());
        $("#creative").html(Lang("hCreative").toUpperCase());
        $("#web").html(Lang("hWeb").toUpperCase());
        $("#advertising").html(Lang("hAdvertising").toUpperCase());
    });

    $("#who").fadeOut(1000,function(){
        $("#top").css('width', '0%');
        $("#bottom").css('left', '100%');
        $("#right").css('height', '0%');
        $("#left").css('top', '100%');
    });

});


function GotoMain() {
    if (logoMinizred) {
        $("#ihead").fadeOut(100);
        $("#ibody").fadeOut(100);
        //$("#who").fadeIn(1000);

        BackLogo(function () {
            stopprint = true;

            $("#ihead").html("");
            $("#ibody").html("");

            setTimeout(function () {
                stopprint = false;
                $("#panel").animate({'top': '120%' }, 700, function () { });
            }, 30);
        });
    }
}


$("#ind").click(function () {
    $("#panel").animate({'top': '95%' }, 700, function () {
    });
});

function circle(id, angle) {
    if (circlestop) return;
    var elem = document.getElementById(id);
    kcRotate(elem, angle);
    if (angle >= 180) angle = 0;
    setTimeout(function () {
        circle(id, angle + 15)
    }, 100);
}

function printText(id, text, position, finish, speed) {
    if (!stopprint) {
        if (typeof speed == 'undefined') speed = textSpeed;
        var char = text.charAt(position);
        if (char == "~") char = "<br/>"
        $(id).html($(id).html() + char);

        if (text.length > position + 1) {
            setTimeout(function () {
                printText(id, text, position + 1, finish, speed)
            }, speed);
        }
        else {
            finish();
        }
    }
}

function kcRotate(elem, deg) {

    var Dx;
    var Dy;
    var iecos;
    var iesin;
    var halfWidth;
    var halfHeight;
    var dummy;

    //degrees to radians
    var rad = deg * (Math.PI / 180);

    //get sine and cosine of rotation angle
    iecos = Math.cos(rad);
    iesin = Math.sin(rad);

    //get element's size
    halfWidth = elem.offsetWidth / 2;
    halfHeight = elem.offsetHeight / 2;

    //calculating position correction values
    Dx = -halfWidth * iecos + halfHeight * iesin + halfWidth;
    Dy = -halfWidth * iesin - halfHeight * iecos + halfHeight;

    //applying CSS3 rotation
    elem.style.transform = "rotate(" + rad + "rad)";

    //vendor prefixed rotations
    elem.style.mozTransform = "rotate(" + rad + "rad)";
    elem.style.webkitTransform = "rotate(" + rad + "rad)";
    elem.style.OTransform = "rotate(" + rad + "rad)";
    elem.style.msTransform = "rotate(" + rad + "rad)";

    //rotation Matrix for IExplorer
    elem.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + iecos + ", M12=" + -iesin + ", M21=" + iesin + ", M22=" + iecos + ", Dx=" + Dx + ", Dy=" + Dy + ", SizingMethod=auto expand)";
    elem.style.msFilter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + iecos + ", M12=" + -iesin + ", M21=" + iesin + ", M22=" + iecos + ", Dx=" + Dx + ", Dy=" + Dy + ", SizingMethod=auto expand)";

    //Fixing black box issue on IE9
    dummy = document.createElement("div");
    dummy.innerHTML = '';
    if (dummy.getElementsByTagName("br").length == 1) elem.style.filter = "none";
    delete dummy;

}

function ReduceLogo(finish) {
    HideSoc();
    if (logoMinizred) {
        finish();
        return;
    }
    logoMinizred = true;
    $("#ihead").html("");
    $("#ibody").html("");

    $("#logo").fadeOut(1000, function () {
        $("#ihead").fadeIn(100);
        $("#ibody").fadeIn(100);

        $("#logo img").animate({'width': '35%' }, 1, function () {
        });
        $("#logo").css("top", "-30%");
        $("#logo img").css("cursor", "pointer");

        $("#logo").fadeIn(1000, function () {
            finish()
        });
    });


}

function BackLogo(finish) {
    if (logoMinizred == false) {
        finish();
        return;
    }
    logoMinizred = false;
    HideSoc();

    $("#ind").fadeOut(400, function () {
        $("#i1").css("top", "100%");
        $("#i2").css("top", "100%");
        $("#i3").css("top", "100%");
        $("#ind").fadeIn(1);
        $("#panel").animate({'top': '120%' }, 700, function () { });
    });

    $("#logo").fadeOut(1000, function () {
        $("#logo img").css("cursor", "default");
        $("#logo").css("top", "-100px");
        $("#logo img").animate({'width': '50%' }, 1, function () {
        });
        $("#logo").fadeIn(1000, function () {
            drawMenu(function(){
                setTimeout(function(){ drawWho(function(){ drawLang() });
                    finish(); },1000);
                //drawWho();
                //finish();
            });
        });
    });


}

function drawLang()
{
    $("#lang").animate({'top': '5%' }, 400, function () { });
}


function drawMenu(finish)
{
    $("#i1").animate({'top': '0px' }, 400, function () {
        $("#i2").animate({'top': '6px' }, 400, function () {
            $("#i3").animate({'top': '12px' }, 400, function () { finish() });
        });
    });
}


function drawWho(finish) {
    $("#who_text").html(Lang("hWho"));

    $("#top").css('width', '0%');
    $("#bottom").css('left', '100%');
    $("#right").css('height', '0%');
    $("#left").css('top', '100%');
    $("#who").fadeIn(200);

    $("#top").animate({'width': '100%' }, 1000, function () { });
    $("#bottom").animate({'left': '0' }, 1000, function () {
        $("#right").animate({'height': '100%' }, 1000, function () { });
        $("#left").animate({'top': '0%' }, 1000, function () { finish(); });
    });
}

function DrawSoc() {
    $("#s1").fadeIn(500, function () {
        $("#s2").fadeIn(500, function () {
            $("#s3").fadeIn(500, function () {
                $("#s4").fadeIn(500, function () {
                });
            });
        });
    });
}

function HideSoc() {
    $("#icontact").html("");
    $("#s1").fadeOut(1);
    $("#s2").fadeOut(1);
    $("#s3").fadeOut(1);
    $("#s4").fadeOut(1);
}


$("#strategy").click(function () {
    $("#info").css("margin-top", "1%");
    StopAllTimers();
    stopprint = true;
    $("#who").fadeOut(1000);
    ReduceLogo(function () {
        $("#ihead").html("");
        $("#ibody").html("");

        setTimeout(function () {
            stopprint = false;
            $("#ihead").html(Lang("hStrategy"));
            setTimeout(function(){
                printText("#ibody", Lang("bStrategy").toUpperCase(), 0, function () {});
            },500);
        }, textSpeed * 10);
    });
});


$("#creative").click(function () {
    $("#info").css("margin-top", "1%");
    StopAllTimers();
    stopprint = true;
    $("#who").fadeOut(1000);
    ReduceLogo(function () {
        $("#ihead").html("");
        $("#ibody").html("");

        setTimeout(function () {
            stopprint = false;
            $("#ihead").html(Lang("hCreative"));

            setTimeout(function(){
                printText("#ibody", Lang("bCreative").toUpperCase(), 0, function () {});
            },500);

        }, textSpeed * 10);
    });
});


$("#web").click(function () {
    $("#info").css("margin-top", "1%");
    StopAllTimers();
    $("#who").fadeOut(1000);
    stopprint = true;
    ReduceLogo(function () {
        $("#ihead").html("");
        $("#ibody").html("");

        setTimeout(function () {
            stopprint = false;
            $("#ihead").html(Lang("hWeb"));

            setTimeout(function(){
                printText("#ibody", Lang("bWeb").toUpperCase(), 0, function () {});
            },500);


        }, textSpeed * 10);
    });
});


$("#advertising").click(function () {
    $("#info").css("margin-top", "1%");
    StopAllTimers();
    $("#who").fadeOut(1000);
    stopprint = true;
    ReduceLogo(function () {
        $("#ihead").html("");
        $("#ibody").html("");

        setTimeout(function () {
            stopprint = false;
            $("#ihead").html(Lang("hAdvertising"));
            setTimeout(function(){
                printText("#ibody", Lang("bAdvertising").toUpperCase(), 0, function () {});
            },500);

        }, textSpeed * 10);
    });
});

$("#who").click(function () {
    $("#info").css("margin-top", "3%");
    $("#who").fadeOut(1000);
    stopprint = true;
    ReduceLogo(function () {

        $("#ihead").html("");
        $("#ibody").html("");

        setTimeout(function () {
            stopprint = false;
            //$("#ihead").removeClass();
            //$("#ihead").addClass( "who" );
            printText("#ihead", "", 0, function () {
                printText("#ibody", Lang("bWho").toUpperCase(), 0, function () {
                    printText("#icontact", Lang("Contact").toUpperCase(),
                        0, function () {
                            DrawSoc();
                        });
                });
            }, textSpeed * 5);

        }, textSpeed * 10);
    });
});

function StopAllTimers() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}


function Lang(name) {

    if (lang == "EN") {
        switch (name) {
            case "hCreative":
                return "creative";
                break;
            case "bCreative":
                return "We create style, drawing inspiration from the classic art and philosophy.~\
                Quintessence, metaphysics, sensory perception - our vision is inexpressible by words, unpronounceable in~\
                any of the living languages. Creative is the way how we communicate with the world, our specialty is the~\
                ability to see the essence of things and express it in images and words.~";
                break;
            case "hStrategy":
                return "strategy";
                break;
            case "bStrategy":
                return "META MOSCOW is the marketing research company that synthesizes math, logic and art to create perfect~\
                business solutions. Analyzing, structuring, vesting the idea in the form we bring the concept to~\
                perfection, completeness, causing your success.~";
                break;
            case "hWeb":
                return "digital";
                break;
            case "bWeb":
                return "We create web design and writing the program code, we develop websites and mobile~ \
                applications, write programs and databases, we are engaged in SEO optimization of sites, build algorithms of~\
                landing pages and manage context advertising.~\
                We may provide a long list of what we can do, but just remember - we can do everything, that is connected to digital.~ ";
                break;
            case "hAdvertising":
                return "advertising";
                break;
            case "bAdvertising":
                return "Proceeding on the goals, we crystallize advertising message tailored to the audience of~ \
                the brand. We build communication between the brand and the consumer, providing a thin, but strong emotional~\
                bond that direct the consumer to make the right choice. ~";
                break;
            case "hWho":
                return "WHO WE ARE";
                break;
            case "bWho":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~~";
                break;
            case "Contact":
                return "105066, Moscow, 45 Olkhovskaya St.,bdg 1 ~+74957259669, +74957908780~info@metamoscow.com~~";
                break;
        }
    }
    if (lang == "RUS") {
        switch (name) {
            case "hCreative":
                return "креатив";
                break;
            case "bCreative":
                return "Мы создаем стиль, черпая вдохновение из классического искусства и философии. ~\
                Квинтэссенция, метафизика, чувственное восприятие - наша философия невыразима словами, ~\
                непроизносима ни на одном из живых языков. Творчество - это наш способ общения с миром. ~\
                Наша особенность - способность видеть суть вещей и выражать ее в образах и словах.~";
                break;
            case "hStrategy":
                return "cтратегия";
                break;
            case "bStrategy":
                return "META MOSCOW – это маркетинговая компания, синтезирующая математику, логику и искусство~" +
                    "для создания идеальных бизнес-решений. Анализируя, структурируя, облекая идею в форму, мы~" +
                    "доводим концепт до совершенства, законченности, обуславливая Ваш успех.~";
                break;
            case "hWeb":
                return "диджитал";
                break;
            case "bWeb":
                return "Мы создаем веб-дизайн и пишем программный код. Мы разрабатываем сайты и мобильные~ \
                приложения, программы и базы данных, мы занимаемся SEO - оптимизацией,  выстраиваем  ~\
                алгоритмы продающих страниц и управляем контекстной рекламой.~\
                Мы можем долго перечислять то, что мы можем делать, если проще - мы можем все, что связано с Диджитал. ~";
                break;
            case "hAdvertising":
                return "реклама";
                break;
            case "bAdvertising":
                return "Исходя из поставленных целей, мы кристаллизуем рекламное сообщение,  адаптированное к~" +
                    "потребностям потребителя  и четко таргетированное на аудиторию бренда. Мы строим коммуникацию~" +
                    "между брендом и потребителем, обеспечивая тонкую, но крепкую эмоциональную связь,  которая~" +
                    "направляет его к принятию необходимых решений.~";
                break;
            case "hWho":
                return "КТО МЫ";
                break;
            case "bWho":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~~";
                break;
            case "Contact":
                return "105066, Moscow, 45 Olkhovskaya St.,bdg 1 ~+74957259669, +74957908780~info@metamoscow.com~~";
                break;
        }
    }


}

