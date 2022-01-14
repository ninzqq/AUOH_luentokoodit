class Order{
    constructor(id, content){ // Luokan konstruktori
        this.id = id;
        this.content = content;
    }

    Summarize(){ //Luokan metodi
        return 'orderId:' + this.id + " content:" + this.content;
    }
}
let order = new Order(1234, "asdf");
let summary = order.Summarize();
console.log(summary);