// Flashers v1.0
// (c) Reetabrata Bhandari [RB Tech] [Jim Fleax]

var ls = localStorage
var flashcards = JSON.parse(ls.getItem('flashcards_db'));

document.body.onload = function() {
    loadHomepage();
    if (flashcards == undefined || flashcards == null) {
        ls.setItem('flashcards_db', '[]');
        console.log('No database detected. Created db');
    } else {
        sync.updateFlashStore();
        console.log('Existing database detected. Updated flashstore');
    }
    document.querySelector('html').setAttribute('oncontextmenu', 'return false');
}
;

function loadFlashcardsMajor() {
    sync.updateFlashStore();
    $ = {
        'names': flashcard.getNames(),
        'tags': flashcard.getTags()
    }
    document.querySelector('#flashcards-wrapper').innerHTML = '';
    var lnth = $.names.length;
    if (lnth <= 0) {
        document.querySelector('#flashcards-wrapper').innerHTML = '<h1 style=" font-family: &apos;InternacionalR&apos;; color: #d8d8d8; width: fit-content; height: fit-content; margin: auto; margin-top: 3em; ">No flashcards to show</h1>';
    } else
        $.names.forEach(function(n) {
            i = $.names.indexOf(n);
            flashMaj = document.createElement('div');
            flashMaj.id = 'flashcardsRect';
            flashMaj.className = i;
            tagL = $.tags.length;

            flashMaj.innerHTML = '<span id="ftitle">' + $.names[i] + '</span><span id="ftags"></span>'
            document.querySelector('#flashcards-wrapper').append(flashMaj);
            $.tags[i].forEach(function(t) {
                tag = document.createElement('span');
                tag.id = 'tag';
                tag.innerText = t;
                flashMaj.children.ftags.append(tag);
            });
            flashMaj.setAttribute('onclick', 'showFlashCard(0,`' + $.names[i] + '`)');
            flashMaj.oncontextmenu = function(e) {
                contextmenu = document.createElement('div');
                contextmenu.id = 'contextmenu';
                contextmenu.innerHTML = '<div id="bd" style=" position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: -webkit-fill-available; height: -webkit-fill-available; margin: auto; z-index: -1; "></div><button>Change name</button> <button>Add tags</button> <button>Delete collection</button>';
                contextmenu.style.top = e.clientY;
                contextmenu.style.left = e.clientX;
                document.querySelector('#flashcards-wrapper').append(contextmenu);
                contextmenu.setAttribute('tabindex', '0');
                contextmenu.autofocus = true;
                window.addEventListener('blur', function() {
                    contextmenu.remove();
                });
                document.querySelector('#bd').addEventListener('click', function() {
                    contextmenu.remove();
                });
                document.querySelector("#contextmenu > button:nth-child(4)").addEventListener('click', function() {
                    modal = document.createElement('div');
                    modal.id = 'modalBox';
                    modal.innerHTML = '<span id="modalContent">The collection will be deleted permanently.</span> <div style=" display: flex; "><button>Cancel</button><button>Delete</button></div>';
                    backdrop = document.createElement('div');
                    backdrop.id = 'modalBackdrop';
                    document.querySelector('#flashcards-wrapper').append(backdrop);
                    document.querySelector('#flashcards-wrapper').append(modal);
                    document.querySelector('#modalBackdrop').onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;

                    document.querySelector("#modalBox > div > button:nth-child(1)").onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;
                    document.querySelector("#modalBox > div > button:nth-child(2)").addEventListener('click', function() {
                        flashcards.splice(i, 1);
                        modal.remove();
                        backdrop.remove();
                        sync.updateLocalStorage();
                        loadFlashcardsMajor();
                    })

                });
                document.querySelector("#contextmenu > button:nth-child(3)").addEventListener('click', function() {
                    modal = document.createElement('div');
                    modal.id = 'modalBox';
                    modal.innerHTML = '<span id="modalContent"><span style=" display: block; ">Add more tags</span><input style=" width: -webkit-fill-available; height: 5vh; border: none; background: #00000017; border-radius: 1vh; margin-top: 3vh; font-size: 2vh; font-family: &apos;InternacionalR&apos;; outline: none; padding: 1vh 2vh; "></span> <div style=" display: flex; "><button>Cancel</button><button>Add</button></div>';
                    backdrop = document.createElement('div');
                    backdrop.id = 'modalBackdrop';
                    document.querySelector('#flashcards-wrapper').append(backdrop);
                    document.querySelector('#flashcards-wrapper').append(modal);
                    document.querySelector('#modalBackdrop').onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;

                    document.querySelector("#modalBox > div > button:nth-child(1)").onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;
                    document.querySelector("#modalBox > div > button:nth-child(2)").addEventListener('click', function() {
                        flashcards[i].tags.push(document.querySelector("#modalContent > input").value);
                        modal.remove();
                        backdrop.remove();
                        sync.updateLocalStorage();
                        loadFlashcardsMajor();
                    });

                });
                document.querySelector("#contextmenu > button:nth-child(2)").addEventListener('click', function() {
                    modal = document.createElement('div');
                    modal.id = 'modalBox';
                    modal.innerHTML = '<span id="modalContent"><span style=" display: block; ">Enter new name</span><input style=" width: -webkit-fill-available; height: 5vh; border: none; background: #00000017; border-radius: 1vh; margin-top: 3vh; font-size: 2vh; font-family: &apos;InternacionalR&apos;; outline: none; padding: 1vh 2vh; " value="' + flashcards[i].title + '"></span> <div style=" display: flex; "><button>Cancel</button><button>Change</button></div>';
                    backdrop = document.createElement('div');
                    backdrop.id = 'modalBackdrop';
                    document.querySelector('#flashcards-wrapper').append(backdrop);
                    document.querySelector('#flashcards-wrapper').append(modal);
                    document.querySelector('#modalBackdrop').onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;

                    document.querySelector("#modalBox > div > button:nth-child(1)").onclick = function() {
                        modal.remove();
                        backdrop.remove();
                    }
                    ;
                    document.querySelector("#modalBox > div > button:nth-child(2)").addEventListener('click', function() {
                        flashcards[i].title = document.querySelector("#modalContent > input").value;
                        modal.remove();
                        backdrop.remove();
                        sync.updateLocalStorage();
                        loadFlashcardsMajor();
                    });

                });
            }
            ;
        })

}
function loadHomepage() {
    document.querySelector('#flashcards-wrapper').innerHTML = '';
    document.querySelector('#flashcards-wrapper').innerHTML = '<span class="greet happyfontb"> What can I do for you <b style=" color: #5c6bc0; font-size: 7vh; ">?</b> </span> <br> <div id="funcContainer"> <div id="funcBox"> <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"> <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"></path> </svg> <span>Show Flashcards</span> </div> <div id="funcBox"> <svg viewBox="0 0 20 20" class="c011618" aria-hidden="true"> <path d="M9.5 16.5a.5.5 0 001 0v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6z" fill-rule="nonzero"></path> </svg> <span>Create Flashcard</span> </div><div id="funcBox"> <svg viewBox="0 0 20 20" class="c011222"><path d="M7.93 3.21A1.5 1.5 0 007.17 3H4.34A2.5 2.5 0 002 5.5v9.16A2.5 2.5 0 004.5 17h4.38l-.44-.43a1.5 1.5 0 01-.36-.57H4.36A1.5 1.5 0 013 14.5v-7H7.22c.36-.04.69-.2.94-.47L9.62 5.5h6.02A1.5 1.5 0 0117 7v5.88l1 1V6.84l-.02-.17A2.5 2.5 0 0015.5 4.5H9.67l-1.6-1.2-.14-.09zM4.5 4h2.75a.5.5 0 01.22.1l1.22.92-1.26 1.32-.06.06a.5.5 0 01-.3.1H3V5.36A1.5 1.5 0 014.5 4z"></path><path d="M11.86 13.86a.5.5 0 00-.71-.7l-2 1.99a.5.5 0 000 .7l2 2a.5.5 0 10.7-.7L10.72 16h5.58l-1.14 1.15a.5.5 0 10.7.7l2-2a.5.5 0 000-.7l-2-2a.5.5 0 10-.7.7L16.29 15h-5.58l1.15-1.14z"></path></svg> <span>Import Flashcards</span> </div> <div id="funcBox" style="transform: scale(0.83);"> <svg class="c01477" viewBox="0 0 20 20"> <path fill-rule="nonzero" d="M15.5 17a.5.5 0 01.09 1H4.5a.5.5 0 01-.09-1H15.5zM10 2a.5.5 0 01.5.41V14.3l3.64-3.65a.5.5 0 01.64-.06l.07.06c.17.17.2.44.06.63l-.06.07-4.5 4.5a.5.5 0 01-.25.14L10 16a.5.5 0 01-.4-.2l-4.46-4.45a.5.5 0 01.64-.76l.07.06 3.65 3.64V2.5c0-.28.22-.5.5-.5z"></path> </svg> <span>Download Flashcards</span> <a id="blob" style="display:none;"></a></div> </div>';
    document.querySelector('#nav > span').addEventListener('click', function() {
        loadHomepage();
    });
    document.querySelector("#funcBox:nth-child(1)").addEventListener('click', function() {
        document.querySelector('#flashcards-wrapper').remove();
        flashWrap = document.createElement('div');
        flashWrap.id = 'flashcards-wrapper';
        flashWrap.innerHTML = '';
        document.querySelector('.mainWrap').append(flashWrap);
        loadFlashcardsMajor();
    });
    document.querySelector("#funcBox:nth-child(2)").addEventListener('click', function() {
        document.querySelector('#flashcards-wrapper').innerHTML = '';
        loadFlashcardsCreator();
    });
    document.querySelector("#funcBox:nth-child(3)").addEventListener('click', function() {
        modal = document.createElement('div');
        modal.id = 'modalBox';
        modal.innerHTML = '<span id="modalContent"><span>Enter your Flashcard database code here</span><textarea style="width: -webkit-fill-available;height: 25vh;border: none;background: #00000017;border-radius: 1vh;margin-top: 3vh;font-size: 2vh;font-family: consolas;outline: none;padding: 1vh 2vh;resize: none;"></textarea></span> <div style=" display: flex; "><button>Cancel</button><button>Create</button></div>';
        backdrop = document.createElement('div');
        backdrop.id = 'modalBackdrop';
        document.querySelector('#flashcards-wrapper').append(backdrop);
        document.querySelector('#flashcards-wrapper').append(modal);
        document.querySelector('#modalBackdrop').onclick = function() {
            modal.remove();
            backdrop.remove();
        }
        ;

        document.querySelector("#modalBox > div > button:nth-child(1)").onclick = function() {
            modal.remove();
            backdrop.remove();
        }
        ;
        document.querySelector("#modalBox > div > button:nth-child(2)").addEventListener('click', function() {
            Flashcode = document.querySelector("#modalContent > textarea").value;
            if (Flashcode == null || Flashcode == '' || typeof Flashcode == "number" || typeof Flashcode == "object") {
                window.alert("Invalid Flashers code!");
            } else {
                ls.setItem('flashcards_db', JSON.parse(document.querySelector("#modalContent > textarea").value));
            sync.updateFlashStore();
            modal.remove();
            backdrop.remove();
            };
            
        })
    });
    document.querySelector("#funcBox:nth-child(4)").addEventListener('click', function() {
        blob = new Blob([JSON.stringify(ls.getItem('flashcards_db'))],{
            type: "text/plain"
        })
        url = URL.createObjectURL(blob);
        //open(url, 'download');
        bloblink = document.querySelector('#blob');
        bloblink.download = 'Flashers Flashcard Database Code';
        bloblink.href = url;
        bloblink.click();
    });

    var flashcards = JSON.parse(ls.getItem('flashcards_db'));
}
navi = [-1, 0, 1];
function nav(input) {
    if (input == -1) {
        navi = [-1, 0, 1];
    } else if (input == '>') {
        navi.forEach((i)=>{
            i + 1
        }
        );
    } else if (input == '<') {
        navi.forEach((i)=>{
            i - 1
        }
        );
    }
}

function showFlashCard(i, u) {

    console.log('Flashcard display ready.')
    $name = flashcard.getNames();
    $card = flashcard.getCards(u);
    if (i < 0 || i > ($card.length - 1)) {
        i = 0;
        nav(-1);
        showFlashCard(0, u);
    } else {
        if (document.querySelector('#flashCard-Wrap') != undefined) {
            document.querySelector('#flashCard-Wrap').remove();
        }

        ;flashCard = document.createElement('div')
        flashCard.id = 'flashCard-Wrap';
        flashCard.innerHTML = '<div id="flashCard-Wrap" onclick="flashCard.remove()"></div> <div id="flashcard-Card"> <div id="flashControlLeft" class="navarrow" onclick="nav(`<`);showFlashCard(' + (i - 1) + ', `' + u + '`);"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 4.6v10.7a1.5 1.5 0 002.23 1.31l10.33-5.74a1.5 1.5 0 00-.08-2.66L5.15 3.24a1.5 1.5 0 00-2.14 1.18L3 4.6zm1 0a.5.5 0 01.72-.46l10.32 4.97a.5.5 0 01.03.9L4.74 15.73A.5.5 0 014 15.3V4.6z" fill-rule="nonzero"></path></svg></div> <div id="flashCard"> <span id="flashTitle">' + $card[i][0] + '</span> <span id="flashContent">' + $card[i][1] + '</span><div id="pagebar" class="SYS reetUI-page-navigation smoothui softTouch">  </div> </div> <div id="flashControlRight" class="navarrow" onclick="nav(`>`);showFlashCard(' + (i + 1) + ',`' + u + '`)"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 4.6v10.7a1.5 1.5 0 002.23 1.31l10.33-5.74a1.5 1.5 0 00-.08-2.66L5.15 3.24a1.5 1.5 0 00-2.14 1.18L3 4.6zm1 0a.5.5 0 01.72-.46l10.32 4.97a.5.5 0 01.03.9L4.74 15.73A.5.5 0 014 15.3V4.6z" fill-rule="nonzero"></path></svg></div></div>';
        flashCard.innerHTML = '<div id="flashCard-Wrap"><div id="flashCard-Wrap" onclick="flashCard.remove()"></div> <div id="flashcard-Card">  <div id="flashSidebar"> <div style=" flex-grow: 2; "><img style=" width: 6vh; height: 5vh; margin: auto; display: block; padding: 5px; filter: drop-shadow(2px 2px 2px #777); image-rendering: -webkit-optimize-contrast; " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA54AAALqCAYAAABdS4uEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB33SURBVHhe7d3NkxxnfcDx6Z6ZHa0MerEJkcEQyRhbrgqmKPuQG7ZvpHJKciV/nHNNckqFGzK3HOyiAlTZJsCKV5NgkpWCtJqdne7M430WZMn2vvVvpl8+nypV/56BE+US/fXT/fQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAYEW+DtLOzs4beQQAOuDGjRv/kEcAOqT34fnee7e/W1WjzxfF6JlyXG9PxqPpah50cANAl9X1h3/qqh5VBwfFb9NvF2b1d9NVmAK0U+8C7MPQrEfPTyf10+PxqMw/AwADcLAcLVOMphAVoQDt0YvwPIrN2Vb9xcJeJgCwsro3qPf3i9+IUIDN63SmvfPO7R9Np/WLdjYBgE+zXI6qxUHx/os3rz+TfwJgjToZnu+8e/tXF2b1F/MSAOBE0vuh8/3i1wIUYL06FZ6CEwBoggAFWK9OhGd6h3M8rr/pkVoAoElVNaoPDoo3X3jh+uv5JwACtD4833339u5sVl/OSwCAxs3nxZ2bN69fyUsAGtba8Ey7nNNp/ZpTagGAdUiP3y4WxS27nwDNa2XWeZcTANiUB3PvfgI0rXXh+eMf396bTusLeQkAsHaLRfHg+eevb+clAOfUqvD8yU92lg4QAgDaIH3787nnbozzEoBzaE14/uxnO1VRtPedUwBgeOp6VD/77A3/UhzgnFoReqvorB0iBAC0UTp0aBWf7lQAzmHj/wYv73QCALRSuk9J9yt5CcAZbDQ80zudHq8FANou3a+k+5a8BOCUNhae6fRaBwkBAF2R7lvS/UteAnAKGwm/9J1On0wBALom3b+k+5i8BOCE1h6e7713+7sXZvUX8xIAoFPSfUy6n8lLAE5g7eE5ndav5REAoJPczwCczlrD8913b+86wRYA6Lp0P5Pua/ISgGOsLTzTIymzWX05LwEAOi3d13jkFuBk1haek0n9ah4BAHphPK6/mUcAPsVawjOd/laWvtcJAPRL+sSKU24BjreW8JxtOcUWAOgnp/UDHC88PNO/BXSgEADQZ3Y9AT5deHja7QQA+s6uJ8CnCw1Pu50AwFC8887tH+URgEeEhud0Uj+dRwCAXptO6xfzCMAjwsJzZ2fnjXTSW14CAPRauu/xXU+AjxcWhg/mxet5BAAYhKoePZ9HAB4SFp5bW/UX8ggAMAgOVQT4eCHhmR6zLYuRY4UAgEFJhyp63BbgcSHh6TFbAGCoPG4L8LiQ8JxM6mt5BAAYFKf6Azyu8fBMj9lOxqNxXgIADIpT/QEe5y9GAICGec8T4KMaD0/vdwIAQ1dVo8/nEYAVO54AAA0ritEzeQRgpfHwdLAQADB05bjeziMAK42HZ1nYRQUAhm0yHk3zCMBK45FYFKMijwAAg+R+COCjIsITAAAA/qjR8Ezf8MwjAMCguS8C+BPvYwIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABBKeAIAABCqyNdG7OzsvLG6fPtwBeu1tTXLEwBs3pNPXn0zj7TE9vb2a3kE1kx40kmPRmax+if56tWreQUA8PGqalQnBwf1/6b1bFb+MF1FKcQSnnTGUWyKTACgactlXaUYTSEqQqF53vGk1VJspj+z2Sw9svThH9EJADRtPC7KVXQ+tRpfvX9/r9rdvffB3t7ercP/FDgv4UkriU0AYFOKYlQ8GqGH/wlwVsKTVnk4OMUmALBpRxG6t7dX2wWFsxOetILgBADa7mgX1A4onJ7wZKMEJwDQNQ/vgOafgGMITzYmRafgBAC6KgXoH/5wf+nxWzie8GTtHt7lBADosnQa7uri8Vs4hvBkrexyAgB9lHY/7969v5+XwCOEJ2tzFJ0AAH00nRbT+/f36rwEHiI8WQvRCQAMQVGMRungobt37/8g/wSsCE/CiU4AYGim0+Jru7v3fp6XMHjCk1CiEwAYqtms/LL4hEPCkzCiEwAYOvEJh4QnIUQnAMChFJ+vfuvfn8lLGCThSeNEJwDAR33nX77+S/HJkAlPGiU6AQA+3r/989d/mUcYHOFJY0QnAMAnS59auXv3/n5ewqAITxqT/jIFAOCTTafFdHf33gd5CYMhPGlE2u28etVuJwDAcWaz8invezI0wpNz84gtAMDp/Os/vfSLPMIgCE/OzSO2AACnMy6LwiO3DInw5Fw8YgsAcDbpkds8Qu8JT87FbicAwNnZ9WQohCdnZrcTAOB87HoyFMKTM7PbCQBwfnY9GQLhyZnY7QQAaIZdT4ZAeHImdjsBAJpj15O+E56cmt1OAIBmbW3Z9aTfhCcAAGxYeprs7t37P8hL6B3hyal5zBYAoHl1XT+bR+gd4cmpeMwWACDG1lb5RB6hd4QnAAC0hMdt6Svhyal4zBYAIE5V1V/II/SK8OTEPGYLABBrMi2ezCP0ivAEAICWGJeeL6OfhCcAALSI9zzpI+HJifn3bwAA8aqqvpxH6A3hCQAALVIUo6fyCL0hPDkRBwsBAKxHWRazPEJvCE8AAGiR8biY5BF6Q3gCAECLOFeDPhKeAAAAhBKeAADQMnt7e7fyCL0gPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAglPAEAAAhV5GsjdnZ23lhdvn24ok+2tmajJ5+8mlfQD+PxOE8A0C7T6fTtPNIzRVG8ksdBEZ6ciPCk6z4uMlf/p54nAID1qaq6PryOlsuqvjcui99NJsWdPkepR22B3kqxefQnReajfwAANqEsiyL9WcXmZLZVXl5dn1v9/HIK0sWiWjyYL3frun7r8L/dD8IT6JVPik0AgLYritHoKEZXy5cPDqplXyJUeAK9IDYBgL4Zj4vy4QjtcoAKT6DTHg1OAIA+ShG6ury8XFbVfL58//DX7hCeQCcJTgBgiNK7oVtb5bWuBajwBDpHcAIAQ3cUoF15BFd4Ap3x8C4nAAB/egQ3HUJ0+Es7CU+gE+xyAgB8snQIUXr8Ni9bR3gCrWaXEwDgZNLjt/VKG9/9FJ5Aa9nlBAA4vfTu5yo+9/KyFYQn0Ep2OQEAzm4VnxcWi+ogLzdOeAKtIzoBAM5vMinGVVXXeblRwhNoFdEJANCcohiN2hCfwhNoDdEJANC8NsSn8ARaQXQCAMTZdHwKT2DjRCcAQLwUn5s6cEh4AhslOgEA1icdOLSJT60ITwAAgAFJn1pZxef7ebkWwhPYGLudAACbsYrPa8+9dOuZvAwnPIGNEJ0AAJv13ve/+Ys8hhOeAAAAA1SWRfFgvtzNy1DCE1g7u50AAO0w2yovr+ORW+EJrJXoBABol3U8cis8AQAABiw9crtYVP+ZlyGEJ7A2djsBANqpLEdfyWMI4QkAADBw0buewhNYC7udAADtFrnrKTwBAAAI3fUUnkA4u50AAJ1xPV8bJTwBAAD40GRSTPLYKOEJAADAHz2YL3fz2BjhCYTymC0AQLdMJ8WlPDZGeAIAAPBH6ZChPDZGeAIAAPAR8/ny/Tw2QngCYTxmCwDQTWVZfC6PjRCeAAAAfMR43OzptsITAACAj0hvedZ1/VZenpvwBAAA4DEHB/XlPJ6b8AQAAOAxVVV/Jo/nJjyBEA4WAgDotiYPGBKeAAAAPKYsR+M8npvwBAAA4DHFSh7PTXgCAADwmOayU3gCAADwCZr6pIrwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIJTwBAAAIFSj4Xnjxo1/yCMAAAB8yI4nAAAAoRoPz7oe1XkEAACA5sPzYDla5BEAAACaD89qWezlEQAAAEIetf1VHgEAAKD58CzL0X/nEQAAAJoPzxdeuP56HgEAAKD58EyWy1GVRwAAAAYuJDwXB8X7eQQAAGDgQsKzLEY/ziMAAAADFxKe6T3Pus4LAAAABi0kPJP5fvHrPAIAADBgYeHpcVsAAACSsPBMj9s63RYAAICw8EwWi+KdPAIAADBQoeH54ovX/zKPAAAADFRoeCYP5g4ZAgAAGLLw8Hzx5vVn8ggAAMAAhYdnYtcTAABguNYSnmnX0wm3AAAAw7SW8EyWy+J7eQQAAGBA1hae6bue83lxJy8BAAAYiLWFZ3Lz5vUrdZ0XAAAADMJawzNZLIpbeQQAAGAA1h6e6ZFbp9wCAAAMx9rDM0mn3C4WxYO8BAAAoMc2Ep7J889f3/aJFQAAgP7bWHgmzz13Y1zXI8cNAQAA9NhGwzN59tkbpZNuAQAA+mvj4Zms4rOw8wkAANBPrQjPJO18eucTAACgf1oTnkl659NptwAAAP3SqvBM0mm3vvMJAADQH60LzyR953N/v7jl0CEAAIDua2V4Ji+8cP31dOjQfF7cyT8BAADQQa0NzyM3b16/knY/q8qptwAAAF3U+vBM0u7nV75yo0zvfnr8FgAAoFs6EZ5H0ruf6fFbAQoAANAdnQrPIw8HqG9/AgAAtFsnw/NICtD07c/V+I8pQqvae6AAAABtU+Rrb+zs7LyxitDXJ5P62mQ8SlFKA7a2ZqMnn7yaV3C88Xg8mk6neQUAQEe9XRTFK3k+s96F58NShKZrCtF0TTFaFqOyKEar/+3SL5yU8OS0hCcAQC8Iz/M6ClOOd+3atS+tLq8eruB4whMAoBeEJ+uzt7d3a3URnpyY8AQA6IVGwrPThwsBAADQfsITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMITAACAUMKTE9ne3n4tjwAAAKciPAEAAAglPDmxus4DAADAKQhPTmy5rA/yCAAAcGLCkxOrqnqeRwAAgBMTnpxYXY9+n0cAAIATE56cWFkWd/IIAABwYsKTE7t06eJLeQQAADgx4cmpLCtn2wIAAKcjPDmVg0X9P3kEAAA4EeHJqZRl8Zs8AgAAnIjw5FS85wkAAJyW8OTU9vere3kEAAA4lvDk1Iqi+FkeAQAAjiU8ObX0uK2zbQEAgJMSnpzJ/n71+zwCAAB8KuHJmVy58sTn8ggAAPCphCdnNp/b9QQAAI4nPDkzu54AAMBJCE/Oxa4nAABwHOHJudj1BAAAjiM8OTe7ngAAwKcRnpxb2vVcVr7sCQAAfDzhSSP+5u9/8OU8AgAAfESRr3Buu7v3PpjNyqfykoEbj8ej6XSaVwAAdNTbRVG8kuczs+NJY9Ijt4tFvchLAACADwlPGnXp0sUtb3sCAAAPE5407q//7j++lEcAAADhSfPe/M5f/epbfys+AQCAQw4XIszu7r2fz2al024HyuFCAAC94HAh2u3KlSf+Yj6vfpGXAADAQAlPQolPAABAeBIuxediUf8wLwEAgIERnqzFpUsXX9re3i58agUAAIZHeLJWFy9uF4tFvchLAABgAIQna3fp0sWt+bz6fV4CAAA9JzzZiCtXnvjc6vLmcllXh78AAAB9JTzZmO3t7dc+85mLY7ufAADQb8KTjUu7n+ngIQEKAAD9JDxpjaPHbwUoAAD0i/CkVdLjtw/vgNb1yAdYAACg44QnrZUC9OLF7fTP6Ie7oCIUAAC6SXjSeke7oA9HqNNwAQCgO4p8hc7Z29u7la6rEP1auk4mxdVipSz9c90G4/F4NJ1O8woAgI56e3WL/Uqez8wNOr10FKVszoULFz67urx8uAIAoKOEJ9BedV2/tboITwCAbmskPL3jCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQCjhCQAAQKgiXwEaV6/kEQCADipW8ngudjyBMLITAKC7qqq5uznhCYSx4wkAQCI8gTBVNVrmEQCAjmnyXk54AmGqqv4gjwAAdMyyqu/l8dyEJxCmLIs/5BEAgI4Zl8Xv8nhuwhMIM5kUd/IIAEDHNHkv53MqQKh0Glozh3ADALAu6YjIsmzuLs6OJxBquawP8ggAQEc0fQ8nPIFQDhgCAOieJg8WSoQnEGo2Gz+dRwAAOmK2Vf4kj43w5hUQbrmsqibfEQAAIM5yWVeTSTnOy0bY8QTCLQ7qu3kEAKDlDpb1/+WxMcITCHdhNr6SRwAAWq7px2wTj74Ba7FYVIvJpJjkJQAALRTxmG1ixxNYl9v5CgBAS43Hxffz2Cg7nsDaOGQIAKC9qqqux+MyZHPSjiewNlU1+mkeAQBomYOD+r/y2Dg7D8Ba2fUEAGifyN3OxI4nsFZ2PQEA2idytzOx6wCsnV1PAID2iDrJ9mF2PIG1e+Eb3/tyHgEA2LCok2wfZscB2IgH8+XubKu8nJcAAGzAfL+6c2E2vpKXYYQnsDEeuQUA2JzoA4Ue5lFbYGM8cgsAsDnris7ETgOwUfP58v2trfJaXgIAsAb7+9VvZ7Px03kZTngCG7eKz71VfF7ISwAAAq2i88EqOrfzci2EJ9AKi0V1MJkUocd4AwAM3cFBvZxOy0lero3wBFojveDuqCEAgBh1PRpt6mBHt3hAq4hPAIDmbTI6E7d3QOuITwCA5mw6OhO3dkAriU8AgPNrQ3QmvuMJtFL6CzK9/J6XAACcUrqXakN0JsITaK104lo67jsvAQA4oXQPtYnTaz+J8ARaLX1jKn3gOC8BADhGunda93c6jyM8gdZb/cX5dLGS3vvMPwEA8Ih0r/TVr7/5pXTvlH9qDUd3AJ3yYL7cnW2Vl/MSAICV+X5158JsfCUvW8eOJ9Ap+S/Ut5fLujr8BQBguI52OdscnYkdT6Cz5vPl+5NJ8edtOa0NAGBdUnBW1ein02n51fxTq7lZAzpPgAIAQ9G14DziJg3ojbqu31ou62+Mx4XXCACAXjk4qA9Wl9tdC84jwhPonRSg8/3qucm4+KwIBQC6Ku1uLg7qu21/f/MkhCfQa0cROi6LJ1YROvEwLgDQVunDcctlfbAKzg/a+EmU83ALBgxKCtGDg/rysqr/LMVoWY7G6XfvhwIA65ICc3VPkt7VXKbIXN2H/GEyKe4URfFK/q/0jhstgCxFaR4BAEL0OS4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFpmNPp/Qk8V6l4uIyIAAAAASUVORK5CYII="></div> <div id="pagebar" class="SYS reetUI-page-navigation smoothui softTouch"> <svg width="20" height="20" viewBox="0 0 20 20" onclick="nav(`<`);showFlashCard(' + (i - 1) + ', `' + u + '`);" style=" transform: rotate(180deg); fill: #fff; cursor: pointer; "><path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 01-.78 0L4.15 8.35a.5.5 0 01.7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0z"></path></svg><div id="pdot"></div><svg width="20" height="20" viewBox="0 0 20 20"  onclick="nav(`>`);showFlashCard(' + (i + 1) + ',`' + u + '`)" style=" fill: #fff; cursor: pointer; "><path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 01-.78 0L4.15 8.35a.5.5 0 01.7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0z"></path></svg></div> <svg id="addFlash" viewBox="0 0 20 20" class="c011618" aria-hidden="true" style=" display: block; fill: #fff; width: 45px; margin: auto; "> <path d="M9.5 16.5a.5.5 0 001 0v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6z" fill-rule="nonzero"></path> </svg></div><div id="flashCard"> <span id="flashTitle">' + $card[i][0] + '</span> <span id="flashContent">' + $card[i][1] + '</span> </div> </div></div>';
        document.querySelector('#flashcards-wrapper').append(flashCard);
        $card.forEach(function(o) {
            pgdot = document.createElement('div');
            pgdot.style.background = '#ffffff94';
            document.querySelector('#pdot').append(pgdot);
            pgdot.onclick = function() {
                console.log(o, $card.indexOf(o));
                i = $card.indexOf(o);
                navi = [i - 1, i, i + 1];
                showFlashCard($card.indexOf(o), u);
            }
            ;
        })
        document.querySelector("#pdot > div:nth-child(" + (i + 1) + ")").style.cssText = "background: rgb(255, 255, 255);transform: scale(1.18);margin-block: 6px;";
        document.querySelector('#addFlash').addEventListener('click', function() {
            flashcards[$name.indexOf(u)].content.push({
                'title': 'Title...',
                'content': 'Content...'
            });
            sync.updateLocalStorage();
            showFlashCard(i, u);
        });
        document.querySelector('#flashCard').oncontextmenu = function(e) {
            contextmenu = document.createElement('div');
            contextmenu.id = 'contextmenu';
            contextmenu.innerHTML = '<div id="bd" tabindex ="0" style=" position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: -webkit-fill-available; height: -webkit-fill-available; margin: auto; z-index: -1; "></div><button>Edit flashcard</button> <button>Delete flashcard</button>';
            contextmenu.style.top = e.clientY;
            contextmenu.style.left = e.clientX;
            document.querySelector('#flashcards-wrapper').append(contextmenu);
            contextmenu.setAttribute('tabindex', '0');
            contextmenu.autofocus = true;
            window.addEventListener('blur', function() {
                contextmenu.remove();
            });
            document.querySelector('#bd').addEventListener('click', function() {
                contextmenu.remove();
            });
            document.querySelector("#contextmenu > button:nth-child(3)").addEventListener('click', function() {
                modal = document.createElement('div');
                modal.id = 'modalBox';
                modal.innerHTML = '<span id="modalContent">The flashcard will be deleted permanently.</span> <div style=" display: flex; "><button>Cancel</button><button>Delete</button></div>';
                backdrop = document.createElement('div');
                backdrop.id = 'modalBackdrop';
                document.querySelector('#flashcards-wrapper').append(backdrop);
                document.querySelector('#flashcards-wrapper').append(modal);
                document.querySelector('#modalBackdrop').onclick = function() {
                    modal.remove();
                    backdrop.remove();
                }
                ;

                document.querySelector("#modalBox > div > button:nth-child(1)").onclick = function() {
                    modal.remove();
                    backdrop.remove();
                }
                ;
                document.querySelector("#modalBox > div > button:nth-child(2)").addEventListener('click', function() {
                    flashcards[$name.indexOf(u)].content.splice(i, 1);
                    modal.remove();
                    backdrop.remove();
                    sync.updateLocalStorage();
                    showFlashCard(i, u);
                })

            });
            document.querySelector("#contextmenu > button:nth-child(2)").addEventListener('click', function() {
                card = document.querySelector("#flashCard");
                fetchCardData = function() {
                    return [document.querySelector("#flashTitle").innerHTML, document.querySelector("#flashContent").innerHTML];
                }
                ;
                document.querySelector("#flashTitle").style.webkitUserModify = 'read-write';
                document.querySelector("#flashContent").style.webkitUserModify = 'read-write';
                document.querySelector("#flashTitle").style.borderBottom = 'solid 1px #ddd';
                $ = document.createElement('div');
                $.id = 'writingMode';
                $.innerHTML = `<button type="button" class="writingbtn"><svg viewBox="0 0 20 20"><path d="M3 5c0-1.1.9-2 2-2h8.38a2 2 0 011.41.59l1.62 1.62A2 2 0 0117 6.62V15a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1v-4.5c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5V16a1 1 0 001-1V6.62a1 1 0 00-.3-.7L14.1 4.28a1 1 0 00-.71-.29H13v2.5c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 016 6.5V4H5zm2 0v2.5c0 .28.22.5.5.5h4a.5.5 0 00.5-.5V4H7zm7 12v-4.5a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5V16h8z"></path></svg></button><button type="button" class="writingbtn"><svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> <path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> </svg></button><button type="button" class="writingbtn"><svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line> <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line> <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line> </svg></button><button type="button" class="writingbtn"><svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path> <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect> </svg></button><button type="button" class="writingbtn"><svg viewBox="0 0 18 18"> <line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line> <path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path> <path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"></path> </svg></button> <span class="writingbtn"><select class="ql-size"><option value="small">10px</option><option value="large"> 20px</option><option value="huge">30px</option></select></span>`
                flashCard.append($);
                save = document.querySelector("#writingMode > button:nth-child(1)");
                bold = document.querySelector("#writingMode > button:nth-child(2)");
                italics = document.querySelector("#writingMode > button:nth-child(3)");
                underline = document.querySelector("#writingMode > button:nth-child(4)");
                strike = document.querySelector("#writingMode > button:nth-child(5)");
                font = document.querySelector("#writingMode > span");
                save.onclick = function() {
                    document.querySelector("#flashTitle").style.webkitUserModify = 'read-only';
                    document.querySelector("#flashContent").style.webkitUserModify = 'read-only';
                    document.querySelector("#flashTitle").style.borderBottom = null;
                    $.remove();
                    delete $;
                    cardDat = fetchCardData();
                    flashcards[$name.indexOf(u)].content[i].title = cardDat[0];
                    flashcards[$name.indexOf(u)].content[i].content = cardDat[1];
                    sync.updateLocalStorage();
                    sync.updateFlashStore();
                    showFlashCard(i, u);
                    //loadFlashcardsMajor();
                }
                ;
            });

        }
        ;
        sync.updateFlashStore();
    }
}
;function loadFlashcardsCreator() {
    creator = document.createElement('div');
    creator.id = 'createFlashWrap';
    creator.innerHTML = `<div> <div id="createFlash"><div style=" width: calc(100% - 34em);"> <span>Collection name</span><input> <span>Tags</span><input placeholder="Enter tags seperated by a comma (,)"> </div></div> <button id="creatBtn">Create</button> </div>`;
    document.querySelector('#flashcards-wrapper').append(creator);

    var FlashCard = {
        'name': document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(2)").value,
        'tags': document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(4)").value,
        'flash title': 'Title...',
        'flash content': 'Content...',
    };

    document.querySelector('#creatBtn').addEventListener('click', function() {
        res = [document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(2)").value, document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(4)").value]
        if (res[0] == '') {
            window.alert('Please enter a collection name to continue.');
        } else
            flashcards.push({
                'title': document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(2)").value,
                "tags": document.querySelector("#createFlash > div:nth-child(1) > input:nth-child(4)").value.split(','),
                "content": [{
                    'title': 'Title...',
                    'content': 'Content...'
                }]
            });
        sync.updateLocalStorage();
        loadHomepage();
    });
}

var sync = {
    'updateLocalStorage': function() {
        ls.setItem('flashcards_db', JSON.stringify(flashcards))
    },
    'updateFlashStore': function() {
        flashcards = JSON.parse(ls.getItem('flashcards_db'));
    }
};

flashcard = {
    'getNames': function() {
        $names = [];
        flashcards.forEach(function(e) {
            $names.push(e.title)
        });
        return $names;
    },
    'getTags': function() {
        $tags = [];
        flashcards.forEach(function(e) {
            var nms = flashcard.getNames();
            if (e.title == nms[flashcards.indexOf(e)]) {
                $tags.push(e.tags)
            } else {
                $tags.push(null)
            }
        });
        return $tags;
    },
    'getCards': function(name) {
        $cards = [];
        nm = flashcards.filter(function(a) {
            return a.title == name
        })[0];
        nm.content.forEach(function(e) {
            $cards.push([e.title, e.content])
        });
        return $cards;
    }

}


/**
*   Build a password protection feature to password protect selected flashcards.
*   Then add a new check button to select isDiary while creating new flashcards...then add special features for diaries.
*   Then add more check buttons to select isContentOnly to remove the title element from flashcards.
*/