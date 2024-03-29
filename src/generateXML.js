const axios = require('axios');

async function generateXML() {
    const postData = new URLSearchParams();
    postData.append('w', 'genXML');
    postData.append('r', 'gen_xml_fe');
    postData.append('clave', '50613051800070232071700100001011522773408107756348');
    postData.append('codigo_actividad', '725002');
    postData.append('consecutivo', '00100001011522773408');
    postData.append('fecha_emision', '2018-05-13T15:30:00-06:00');
    postData.append('emisor_nombre', 'Walner Borbon');
    postData.append('emisor_tipo_identif', '01');
    postData.append('emisor_num_identif', '702320717');
    postData.append('nombre_comercial', 'Walner Borbon');
    postData.append('emisor_provincia', '6');
    postData.append('emisor_canton', '02');
    postData.append('emisor_distrito', '03');
    postData.append('emisor_barrio', '01');
    postData.append('emisor_otras_senas', 'Frente a la escuela');
    postData.append('emisor_cod_pais_tel', '506');
    postData.append('emisor_tel', '64206205');
    postData.append('emisor_cod_pais_fax', '506');
    postData.append('emisor_fax', '00000000');
    postData.append('emisor_email', 'walner1borbon@gmail.com');
    postData.append('receptor_nombre', 'Julian Subiros');
    postData.append('receptor_tipo_identif', '01');
    postData.append('receptor_num_identif', '114480790');
    postData.append('receptor_provincia', '6');
    postData.append('receptor_canton', '02');
    postData.append('receptor_distrito', '03');
    postData.append('receptor_barrio', '01');
    postData.append('receptor_cod_pais_tel', '506');
    postData.append('receptor_tel', '84922891');
    postData.append('receptor_cod_pais_fax', '506');
    postData.append('receptor_fax', '00000000');
    postData.append('receptor_email', 'julisubiros@gmail.com');
    postData.append('condicion_venta', '01');
    postData.append('plazo_credito', '30');
    postData.append('medios_pago', JSON.stringify([{ "codigo": "01"}]));
    postData.append('cod_moneda', 'CRC');
    postData.append('tipo_cambio', '502');
    postData.append('total_serv_gravados', '0');
    postData.append('total_serv_exentos', '200000');
    postData.append('total_merc_gravada', '0');
    postData.append('total_merc_exenta', '0');
    postData.append('total_gravados', '0');
    postData.append('total_exentos', '200000');
    postData.append('total_ventas', '200000');
    postData.append('total_descuentos', '100');
    postData.append('total_ventas_neta', '200000');
    postData.append('total_impuestos', '0');
    postData.append('total_comprobante', '200000');
    postData.append('otros', 'Muchas gracias');
    postData.append('detalles', JSON.stringify({
        "1": {
            "codigo": "157",
            "codigoComercial": {"1": {"tipo": "441", "codigo": "57"}},
            "cantidad": "2",
            "unidadMedida": " Unid",
            "detalle": "Globos",
            "precioUnitario": "10.00",
            "montoTotal": "20",
            "descuento": [{"montoDescuento": "3", "naturalezaDescuento": "Promoción fin de año"}],
            "subtotal": "17",
            "impuesto": {"1": {"codigo": "01", "codigoTarifa": "08", "tarifa": "13", "monto": "1.3"}},
            "montoTotalLinea": "18.3"
        }
    }));

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios.post('http://155.138.238.173:8080/api.php', postData, config);
        // Retornar el XML generado en lugar de solo imprimirlo
        console.log('Respuesta completa:', response.data);
        return response.data.resp.xml;
    } catch (error) {
        console.error('Error al generar el XML:', error);
        throw error;
    }
}

module.exports = generateXML;
