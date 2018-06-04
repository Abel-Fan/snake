class Snake{
	constructor(){
		this.boxs={}
		this.screen = ""
		this.snake = ["0.0","0.1","0.2"]
		this.head = "0.2"
		this.direction = "right"
		this.sudu = 200
		this.t=""  //计时器
		this.init()
		this.score = 0
		this.food = ""
	}
	init(){
		document.body.onkeydown = (e)=>{
			if(e.keyCode==37){
				if(this.direction!="right"){
					this.direction = "left";
				}
	        }else if(e.keyCode==38){
	        	if(this.direction!="bottom"){
					this.direction = "top";
				}
	        }else if(e.keyCode==39){
	            if(this.direction!="left"){
					this.direction = "right";
				}
	        }else if(e.keyCode==40){
	            if(this.direction!="top"){
					this.direction = "bottom";
				}
	        }
		}
	}
	createDiv(){
		for(let i=0;i<30;i++){
			for(let j=0;j<50;j++){
				let box = document.createElement("div");
				box.id = `${i}.${j}`
				this.boxs[box.id] = box
				this.screen.appendChild(box)
			}
		}
	}
	createSnake(){
		for(let item in this.boxs){
			if (this.snake.indexOf(item)>-1){
				this.boxs[item].className = 'snake'
			}else{
				if(this.boxs[item].className!='food'){
					this.boxs[item].className = ''
				}
				
			}
		}
	}
	createFood(){
		let item 
		do{
			let i = Math.floor(Math.random()*30)
			let j = Math.floor(Math.random()*50)
			item = `${i}.${j}`
		}while(this.snake.indexOf(item)>-1)
		this.boxs[item].classList.add("food")
		this.food = item
	}
	run(){
		this.t = setInterval(()=>{
			let j = Number(this.head.split(".")[1])
			let i = Number(this.head.split(".")[0])
			if(this.direction=="right"){
				j++
				
				if (j>=50){
					this.gameOver()
					return
				}
			}
			if(this.direction=="left"){
				j--

				if (j<0){
					this.gameOver()
					return
				}
			}
			if(this.direction=="top"){
				i--

				if(i<0){
					this.gameOver()
					return
				}
			}
			if(this.direction=="bottom"){
				i++

				if(i>=30){
					this.gameOver()
					return
				}
			}
			// console.log(this.head)
			this.head = `${i}.${j}`
			if(this.snake.indexOf(this.head)>-1){
				this.gameOver()
			}

			if(this.head==this.food){
				this.boxs[this.food].className =  ""
				this.score++
				this.createFood()
				console.log(this.score)
			}else{
				this.snake.shift()
			}
			this.snake.push(this.head)
			this.createSnake()

		},this.sudu)
	}
	gameOver(){
		console.log("gameOver")
		clearInterval(this.t)
	}
}

