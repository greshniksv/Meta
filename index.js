var circlestop = false;
var stopprint = false;
var logoMinizred = false;
var textSpeed = 15;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function () {
    //circle("ind2",0);
    $("#logo_img").fadeOut(1);
    $("#strategy").html(Lang("hStrategy","en").toUpperCase());
    $("#creative").html(Lang("hCreative","en").toUpperCase());
    $("#web").html(Lang("hWeb","en").toUpperCase());
    $("#advertising").html(Lang("hAdvertising","en").toUpperCase());


    $("#logo_img").fadeIn(1000,function(){
        drawMenu(function(){
            drawWho();
        });
    });

});

$("#cross img").click(function () {
    //GotoMain();
    $("#panel").animate({'top': '120%' }, 700, function () {
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
                //$("#ihead").removeClass();
                //$("#ihead").addClass( "strategy" );

                $("#panel").animate({'top': '120%' }, 700, function () {
                });

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
        $("#logo img").css("margin-top", "30px");
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

    $("#panel").animate({'top': '120%' }, 700, function () { });

    $("#ind").fadeOut(1000, function () {
        $("#i1").css("top", "100%");
        $("#i2").css("top", "100%");
        $("#i3").css("top", "100%");
        $("#ind").fadeIn(1);
    });

    $("#logo").fadeOut(1000, function () {
        $("#logo img").css("cursor", "default");
        $("#logo img").css("margin-top", "100px");
        $("#logo img").animate({'width': '50%' }, 1, function () {
        });
        $("#logo").fadeIn(1000, function () {
            drawMenu(function(){
                drawWho();
                finish();
            });
        });
    });


}

function drawMenu(finish)
{
    $("#i1").animate({'top': '0px' }, 700, function () {
        $("#i2").animate({'top': '6px' }, 700, function () {
            $("#i3").animate({'top': '12px' }, 700, function () { finish() });
        });
    });
}


function drawWho() {
    $("#who_text").html(Lang("hWho","en"));

    $("#top").css('width', '0%');
    $("#bottom").css('left', '100%');
    $("#right").css('height', '0%');
    $("#left").css('top', '100%');
    $("#who").fadeIn(200);

    $("#top").animate({'width': '100%' }, 1000, function () {
    });
    $("#bottom").animate({'left': '0' }, 1000, function () {
        $("#right").animate({'height': '100%' }, 1000, function () {
        });
        $("#left").animate({'top': '0%' }, 1000, function () {
        });
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
            $("#ihead").html(Lang("hStrategy","en"));
            printText("#ibody", Lang("bStrategy","en").toUpperCase(), 0, function () {});
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
            $("#ihead").html(Lang("hCreative","en"));
            printText("#ibody", Lang("bCreative","en").toUpperCase(), 0, function () {});
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
            $("#ihead").html(Lang("hWeb","en"));
            printText("#ibody", Lang("bWeb","en").toUpperCase(), 0, function () {});
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
            $("#ihead").html(Lang("hAdvertising","en"));
            printText("#ibody", Lang("bAdvertising","en").toUpperCase(), 0, function () {});
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
                printText("#ibody", Lang("bWho","en"), 0, function () {
                    printText("#icontact", Lang("Contact","en"),
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





function Lang(name,lang)
{
    if(lang=="en")
    {
        switch (name)
        {
            case "hCreative": return "creative"; break;
            case "bCreative":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~"; break;
            case "hStrategy": return "strategy"; break;
            case "bStrategy":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~"; break;
            case "hWeb": return "digital"; break;
            case "bWeb":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~"; break;
            case "hAdvertising": return "advertising"; break;
            case "bAdvertising":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~"; break;
            case "hWho": return "WHO WE ARE"; break;
            case "bWho":
                return "META is branding laboratory, based in Moscow, witch specializes in products of Premium Segment.~\
            Looking at the world through the prism of Metaphysics we see the process that underlie the \
            success of any projects.~\
            We build out outlook on the aesthetics and philosophy, trying to understand the depth of the human \
            mind, using this experience to create masterpieces of creative art of branding.~~"; break;
            case "Contact":
                return "105066, Moscow, 45 Olkhovskaya St.,bdg 1 ~+74957259669, +74957908780~info@metamoscow.com~~";
                break;
        }


    }

}

