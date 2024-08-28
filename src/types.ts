export class BasicError {
  public error_code: string
  public error_description: string
  constructor(error_code: string, error_description: string) {
    this.error_code = error_code
    this.error_description = error_description
  }
}

export class DoubleReportError extends BasicError {
  constructor() {
    super('DOUBLE_REPORT', 'Leitura do mês já realizada')
  }
}

export class MeasureNotFoundError extends BasicError {
  constructor() {
    super('MEASURE_NOT_FOUND', 'Leitura do mês já realizada')
  }
}

export class ConfirmationDuplicatedError extends BasicError {
  constructor() {
    super('CONFIRMATION_DUPLICATE', 'Leitura do mês já realizada')
  }
}

export class MeasuresNotFoundError extends BasicError {
  constructor() {
    super('MEASURES_NOT_FOUND', 'Nenhuma leitura encontrada')
  }
}
