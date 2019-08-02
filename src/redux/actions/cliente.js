import * as types from './types';

export const clienteModificarAltoDisponible = nuevoAlto => ({
  type: types.CLIENTE_MODIFICAR_ALTO_DISPONIBLE,
  payload: { alto: nuevoAlto },
});

export const clienteModificarAnchoDisponible = nuevoAncho => ({
  type: types.CLIENTE_MODIFICAR_ANCHO_DISPONIBLE,
  payload: { ancho: nuevoAncho },
});
