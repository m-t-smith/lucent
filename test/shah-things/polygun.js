class polygun extends line {

	constructor(_name,_color)
	{
		super(_name,_color)
		
	}
	
	printAll()
	{
		
		console.log(this.color+" -- == -- "+this.name+" -=-= "+ this.rot);
	
	}
	
	killAlllHumans(_val)
	{
		
		//super.setRot(12345);
		super.setName("meme1");
		super.color="mnememememem";
		
		this.printAll();
	}

}