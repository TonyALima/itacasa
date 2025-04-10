interface Operacao
{
    adquirir(i: Imovel): Contrato;
    preco(i: Imovel): number;
}

class Venda implements Operacao{
    adquirir(i: Imovel): Contrato{
        i.operacoes = [];
        return new Contrato(i, this, new Date());
    }
    preco(i: Imovel): number{
        return i.valor;
    }
}

class Aluguel implements Operacao{
    adquirir(i: Imovel): Contrato{
        i.operacoes = [];
        return new Contrato(i, this, new Date(), new Date());
    }
    preco(i: Imovel): number{
        return i.valor / 100;
    }
}

abstract class Imovel{
    constructor(public cidade: string, public bairro: string, public areaConstruida: number, 
        public numQuartos: number, public valor: number, public operacoes: Operacao[] = []){}
}

class Casa extends Imovel{
    constructor(public areaQuintal: number, cidade: string, bairro: string, areaConstruida: number, numQuartos: number, valor: number){
        super(cidade, bairro, areaConstruida, numQuartos, valor);
    }
}

class Apartamento extends Imovel{
    constructor(public andar: number, cidade: string, bairro: string, areaConstruida: number, numQuartos: number, valor: number){
        super(cidade, bairro, areaConstruida, numQuartos, valor);
    }
}

abstract class Pessoa{
    constructor(public nome: string, public cpf: string){}
}

class Cliente extends Pessoa{
    constructor(public contratos: Contrato[] = [], nome: string, cpf: string){
        super(nome, cpf);
    }
}

class Proprietario extends Pessoa{
    constructor(public imoveis: Imovel[] = [], nome: string, cpf: string){
        super(nome, cpf);
    }
}

class Contrato{
    constructor(public imovel: Imovel, public operacao: Operacao, public inicio: Date, public duracao?: Date){
    }
}