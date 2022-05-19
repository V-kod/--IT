const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("The glasses are matched", 0),
	new Result("The glasses are matched", 2),
	new Result("The glasses are matched", 4),
	new Result("The glasses are matched", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("You are looking for ", 

	[
		new Answer("Women’s Styles", 1),
		new Answer("Men’s Styles", 2),
		
	]),

new Question(" What type of glasses are you looking for?", 

	[
		new Answer("Eyeglass", 1),
		new Answer("Sunglasses", 2),
		
	]),
new Question("Do you need vision correction?  ", 

	[
		new Answer("Yes", 2),
		new Answer("No", 1),
		
	]),
new Question("What’s your current frame size? ", 

	[
		new Answer("Small", 1),
		new Answer("Medium", 2),
                      new Answer("Large", 3),
		
	]),
new Question("Would you like to protect your eyes  from light emanating from screens? ", 

	[
		new Answer("Yes", 1),
		new Answer("No", 2),
		
	]),
new Question("Every face shape has a perfect fit. What’s yours? ", 

	[
		new Answer("I have a long face", 1),
		new Answer("I have a round face", 2),
new Answer("In between", 3),
		
	]),
new Question("How would you define your facial features? ", 

	[
		new Answer("Sharp", 1),
		new Answer("Rounded", 2),
new Answer("In between", 3),
		
	]),
new Question(" Which frame style are you looking for?", 

	[
		new Answer("Rectangle", 12),
		new Answer(" Wayframe", 1),
new Answer(" Cat Eye", 2),
new Answer("Browline ", 3),
new Answer("Round ", 4),
new Answer("Rimless ", 5),
new Answer("Aviator", 6),
new Answer("Oval", 7),
new Answer("Square ", 8),
new Answer(" Geometric", 9),
new Answer(" Oversized", 10),
new Answer(" Wrap", 11),



		
	]),
new Question("Are you looking for any particular eyewear brands? ", 

	[
		new Answer("Yes, I have some in mind", 2),
		new Answer("No, brand isn’t important", 1),
		
	]),
new Question("Choose your favorite brands You can pick more than one ", 

	[
		new Answer("Ray Ban", 12),
		new Answer("Hillary Duff", 1),
new Answer
("MICHAEL KORS", 2),
new Answer
("OAKLEY", 3),
new Answer
("PRADA", 4),
new Answer
("COACH", 5),
new Answer
("GUCCI", 6),
new Answer
("VERSACE", 7),
new Answer
("TORY BURCH", 8),
new Answer
("ARMANI EXCHANGE", 9),
new Answer
("VOGUE eyewear", 10),
new Answer
("BURBERRY", 11),

		
	])

];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}