var regioes = [];
var dados;
var factor;

function preload()
{
  dados = loadTable("assets/mapeamento.csv", "csv", "header");  //Carregar ficheiro csv com os dados
}

function setup() 
{
  createCanvas (windowWidth, windowHeight);

  //print (dados.getRowCount() );

  factor = 3500; //numero divisor

  // print (dados.getRowCount() );
  // print (dados.getColumnCount() );
  // print (dados.getColumnCount("Homens") );

 
  for (var linha=0; linha<dados.getRowCount(); linha++)  //ciclo for ler os dados da linha da tabela
  {
    for (var coluna=0; coluna<dados.getColumnCount(); coluna++) //ciclo for ler os dados da coluna da tabela
    {
      var x = (width/dados.getRowCount()) * linha /1.3 +400; 
      var y = height/2;
      var regiao = dados.getString(linha, 0); // variavel que le os dados da coluna 0 
      var densidade = dados.getNum(linha,1); // variavel que le os dados da coluna 1
      var tabaco = dados.getNum(linha,2);   // variavel que le os dados da coluna 2
      var poluicao = dados.getNum(linha,3); // variavel que le os dados da coluna 3
      

      regioes [linha] = new Regiao (x, y, regiao, densidade, tabaco, poluicao,factor); //array que guarda todos os dados
    }
  }

 
 }


function draw()  
{
  
  background(255);

  for(var i =0; i<dados.getRowCount(); i++)  //le os dados da linha da tabela
   {
    regioes[i].desenha(); // guarda os dados da linha regioes
  }
  
  noLoop();
}




class Regiao
{
  constructor (x_,y_,regiao_,densidade_,tabaco_,poluicao_,factor_)

  {
    this.x = x_;
    this.y = y_;
    this.regiao = regiao_;
    this.densidade = densidade_;
    this.tabaco = tabaco_;
    this.poluicao = poluicao_;
    this.factor = factor_;
    
     
    this.fazmal = this.tabaco + this.poluicao;   // variavel que soma os valores da coluna tabaco com os valores de poluição
    this.cor = color(0, 0, 0, 0);    //variavel que guarda uma cor
    this.transparecia = 0;           // variavel que guarda as transparências
  }
  
 

  desenha () 
  { 
    
 
    print (this.regiao);
    
  

    this.transparecia = map (this.fazmal, 0, 2000000, 0, 255);  // a transparencia das ellipses vai variar pelo valor e poluiçao causada pelo tabaco

    if (this.regiao==="Norte") this.cor = color (100, 192, 217, this.transparecia);
    if (this.regiao==="Centro") this.cor = color ( 107, 107, 107, this.transparecia);
    if (this.regiao==="Lisboa") this.cor = color (100, 192, 217, this.transparecia);
    if (this.regiao==="Alentejo") this.cor = color (163, 165, 177, this.transparecia);
    if (this.regiao==="Algarve") this.cor = color (107, 107, 107, this.transparecia);
    if (this.regiao==="Acores") this.cor = color (163, 165, 177, this.transparecia);
    if (this.regiao==="Madeira") this.cor = color (107, 107, 107, this.transparecia);
    
    noStroke();

    fill (this.cor);
  
    ellipse(this.x, this.y, this.densidade/this.factor);
    

    fill(96);
    noStroke();
    textSize(15);
    textAlign(CENTER, CENTER);
    text(this.regiao,this.x/1, this.y);

     /*
     for (var i=0; i<this.fazmal/1000; i++)
     {
       point(random(width), random(height));
     }
     */
    }
}


function windowResized() 
{
  resizeCanvas (windowWidth, windowHeight);
}