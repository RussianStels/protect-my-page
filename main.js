;
//conProtect = true; // условная блокировка. Если флаг выключен/отсутствует, то все последующие флаги = true
protectionEnabled = true;	// скрипт включен 

//		Реализация:

//	+ Блок выделения и перетаскивания
denySelection = true;	// запрет выделения текста
denyDragging = true;		// запрет перетаскивания

// + Защита изображений
protectImages = true;	// отключение контекстного меню изображений	

//	+ Блок Ctrl+S
denySaving = true;	// запрет на сохранение страницы

//	+ Блок Print Screen
denyPrscr = true;		// запрет на снимок экрана
	
//	+ Защита исходного кода
denySource = true;
sourceURL = ("src/"+location.pathname.split('/')[location.pathname.split('/').length - 1]); // файл, из которого загружается исходный код — одноимённый из папки src

//	+ Парольная защита
showButton = true;	// отображение кнопки с информацией о скрипте
allowDisabling = true;	// возможность отключить скрипт по паролю
disablePassword = "-792095615";	// пароль для отключения | "pass123".hashCode();

String.prototype.hashCode = function(){ // вычисления хеша. 
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
	//   подключение JQuery  { 
	;{
		document.write(unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js'%3E%3C/script%3E")); 
		if (typeof jQuery == 'undefined') {
			document.write(unescape("%3Cscript src='jquery-1.12.2.min.js'%3E%3C/script%3E"));
		}
	}
	//		{ подключение JQuery 
	
(function(){ 	

	
	 function disableProtection(){ // отключение скрипта
		denySelection = false;	// запрет выделения текста
		denyDragging = false;		// запрет перетаскивания
		protectImages = false;	// отключение контекстного меню изображений
		denySaving = false;	// запрет на сохранение страницы
		denyPrscr = false;		// запрет на снимок экрана
		showButton = false;	// отображение кнопки с информацией о скрипте
		allowDisabling = false;	// возможность отключить скрипт по паролю
		settingsDiv.style.display = "none"; // убираем кнопку с экрана
		document.onmousedown = document.onselectstart = NaN; // включение выделения
		document.ondragstart = NaN; // включение перетаскивания
		document.head.removeChild(protectImg); // выключение защиты изображений
		alert("Защита отключена");
	 };
	if((typeof conProtect == 'undefined' || !conProtect) ||  protectionEnabled){ 		
		function nope() { return false;};
		
		var settingsDiv, settingsWindow, blur, protectImg;
		window.onload = function(){ // действия после загрузки страницы
			if(showButton) { document.body.appendChild(settingsDiv);	// добавляет кнопку на страницу с информацией о скрипте и вводом пароля отключения
				document.body.appendChild(settingsWindow);	// добавляет окно ввода пароля
				if((typeof conProtect == 'undefined' || !conProtect) || denySource) loadPage(sourceURL); // загружает исходный код из внешнего файла
				document.getElementById("closeButton").onclick = closeSettings;
				document.getElementById("disableButton").onclick = pressDisableButton;
			}
			if((typeof conProtect == 'undefined' || !conProtect) || denyPrscr)	document.body.appendChild(blur);	// добавляет шоры на страницу с неактивным окном
		};
		if((typeof conProtect == 'undefined' || !conProtect) || denyPrscr)	function copyToClipboard(elementId) { // функция копирования в буфер
		  var aux = document.createElement("input"); // создание скрытого поля ввода
		  aux.setAttribute("value", elementId);
		  document.body.appendChild(aux);
		  aux.select(); // выделение
		  document.execCommand("copy"); // копирование
		  document.body.removeChild(aux); // удаление поля
		};
		function showSettings() { // инициализация окна с вводом пароля и возможностью отключения скрипта
			if((typeof conProtect == 'undefined' || !conProtect) || showButton){
				var css = document.createElement("link"); // подключение таблицы стилей
				css.rel = "stylesheet"
				css.type = "text/css"
				css.href = "style.css";
				document.head.appendChild(css);
				settingsDiv = document.createElement("div"); // Добавление кнопки настроек
				settingsDiv.id = "settingsButton";
				settingsDiv.className = "settingsButton";
				settingsDiv.onclick = openSettings;
				settingsDiv.innerHTML = '<img src="setbut.png" width="15" height="15" alt="Настройки"/>';
				settingsWindow = document.createElement("div");
				settingsWindow.className = "settingsWindow";
				settingsWindow.style.display = "none";
				settingsWindow.innerHTML = '<div style="font: 10pt; padding-left: 350px;"><button id="closeButton">x</button></div><p>На странице действует защита от копирования</p><div><p style="font-size: 12pt;">Введите пароль для отключения</p><p><input id="passField" type="password" autofocus onclick="this.focus()"/> <button id="disableButton">Отключить</button></p></div>';
			}
		};
		function openSettings() { // открывает окно с вводом пароля
			if((typeof conProtect == 'undefined' || !conProtect) || showButton)	settingsWindow.style.display = "block";
		}
		function closeSettings(){ //  действие при нажатии кнопки "закрыть" на окне с информацией о скрипте и вводом пароля
			if((typeof conProtect == 'undefined' || !conProtect) || showButton) settingsWindow.style.display = "none";
		};
		function pressDisableButton(){	// действие при нажатии кнопки "отключить" на окне с информацией о скрипте и вводом паролём
			if(document.getElementById("passField").value.hashCode() == disablePassword) {
				closeSettings();
				disableProtection();
			}
			else alert("Ошибка: Неверный пароль");
		};
		function protectSaving() { // отключает сохранение (Ctrl+S)
			function preventSaving(event) {
				if (((typeof conProtect == 'undefined' || !conProtect) || denySaving) &&event.keyCode == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
					event.preventDefault(); // отмена диалогового окна
					openSettings(); // открытие окна с вводом пароля
				}
			}
			document.addEventListener("keydown", preventSaving, false);
		};
		function protectPrintScreen(){ // отключает PrintScreen
			function preventPrscr (event) {
				if((typeof conProtect == 'undefined' || !conProtect) || denyPrscr && event.keyCode == 44){
					openSettings(); // открытие окна с вводом пароля
					event.preventDefault();
					nope;
					setTimeout(function(){copyToClipboard("Deny");}, 50);
					setTimeout(function(){copyToClipboard("Deny");}, 500);
					setTimeout(function(){copyToClipboard("Deny");}, 2000);
				}
			}
			document.addEventListener("keyup", preventPrscr, false);
			blur = document.createElement("div"); // скрытие страницы, если окно неактивно
			blur.className = "blur";
			blur.style.display = "none";
			blur.innerHTML="<p>Содержимое скрыто</p><p><button onclick='window.onfocus();'>показать</button></p>";
			window.onblur = function(){ if((typeof conProtect == 'undefined' || !conProtect) || denyPrscr) blur.style.display = "block"; document.body.clear;};
			window.onfocus = function(){blur.style.display = "none";};
		};
		function protectSelection(){ // отключает выделение
			if((typeof conProtect == 'undefined' || !conProtect) || denySelection) document.onmousedown = document.onselectstart = nope; //function (e) { e = e || event; alert(e.currentTarget); return false;} // выделение
		};
		function protectDragging(){ // отключает перетаскивание
			if((typeof conProtect == 'undefined' || !conProtect) || denyDragging) document.ondragstart = nope; 
		}; 
		function enableImageProtection(){ // отключает контекстное меню изображений
			if(protectImages) {
				protectImg = document.createElement("style");
				protectImg.innerHTML = "img { pointer-events: none; }";
				document.head.appendChild(protectImg);
			}
		};
		function loadPage(pageurl){ // загружает html-код
			$("#content").load(pageurl); 
		};
		showSettings();
		protectSaving();
		protectSelection();
		protectDragging();
		enableImageProtection();
		protectPrintScreen();
	}
})();

/* 
	===  Ссылки на источники  ===
Реализация функции copyToClipboard — Piotr Kazuś — URL: https://stackoverflow.com/a/34133759/6113087
Реализация функции hashCode — URL: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
*/