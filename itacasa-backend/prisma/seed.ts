import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
async function main() {
    const senhaHash = await argon2.hash('senha123');
    // Cria um novo proprietário
    const proprietario = await prisma.user.create({
        data: {
            tipo: 'PROPRIETARIO',
            nome: 'Tony Lima',
            cpf: '123.456.789-00',
            email: 'tony@unifei.edu.br',
            senha: senhaHash,
        }
    });
    // Cria um novo cliente
    const cliente = await prisma.user.create({
        data: {
            tipo: 'CLIENTE',
            nome: 'Enzo Seraphim',
            cpf: '987.654.321-00',
            email: 'seraphin@unifei.edu.br',
            senha: senhaHash,
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