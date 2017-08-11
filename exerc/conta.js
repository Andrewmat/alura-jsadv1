
class Conta {
  constructor(saldo = 0) {
    this._saldo = saldo;
  }

  get saldo() {
    return this._saldo;
  }

  atualiza(taxa) {
    throw new Error('Conta.atualiza(taxa) deve ser implementado');
  }
}

class ContaCorrente extends Conta {
  atualiza(taxa) {
    this._saldo += taxa;
  }
}
class ContaPoupanca extends Conta {
  atualiza(taxa) {
    this._saldo += 2 * taxa;
  }
}