import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
async function main() {
    // Cria um novo proprietário
    const proprietario = await prisma.pessoa.create({
        data: {
            tipo: 'PROPRIETARIO',
            nome: 'Tony Lima',
            cpf: '123.456.789-00',
        }
    });
    // Cria um novo cliente
    const cliente = await prisma.pessoa.create({
        data: {
            tipo: 'CLIENTE',
            nome: 'Enzo Seraphim',
            cpf: '987.654.321-00',
        }
    });
    // Cria uma nova casa
    const casa = await prisma.imovel.create({
        data: {
            tipo: 'CASA',
            cidade: 'Itajuba',
            bairro: 'Centro',
            areaConstruida: 100,
            numQuartos: 3,
            tamanhoQuintal: 50,
            valor: 300000,
            proprietarioId: proprietario.id,
        }
    });
    // Cria um novo apartamento
    const apartamento = await prisma.imovel.create({
        data: {
            tipo: 'APARTAMENTO',
            cidade: 'Itajuba',
            bairro: 'Pinheirinho',
            areaConstruida: 80,
            numQuartos: 2,
            andar: 5,
            valor: 200000,
            proprietarioId: proprietario.id,
        }
    });
    // Cria um novo contrato de venda
    const contratoVenda = await prisma.contrato.create({
        data: {
            tipoOperacao: 'VENDA',
            dataInicio: new Date(),
            dataFim: null,
            clienteId: cliente.id,
            imovelId: casa.id,
        }
    });

    // Cria um novo contrato de aluguel
    const contratoAluguel = await prisma.contrato.create({
        data: {
            tipoOperacao: 'ALUGUEL',
            dataInicio: new Date(),
            dataFim: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            clienteId: cliente.id,
            imovelId: apartamento.id,
        }
    });

}

main()
    .catch((e) => {
        console.error('Erro no seed:', e)
    })
    .finally(() => {
        prisma.$disconnect();
        console.log('Seed concluído!');
    });