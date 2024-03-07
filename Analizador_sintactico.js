function Ejecutar() {
    const code = document.getElementById('code').value;
    const result = parseCode(code);
    document.getElementById('result').textContent = JSON.stringify(result, null, 2);
  }
  
  function parseCode(code) {
    const functionRegex = /function\s+([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)\s*{([^}]*)}/g;
    const Funciones = [];
    let coincide;
  
    while ((coincide = functionRegex.exec(code)) !== null) {
      const functionName = coincide[1];
      const Parametro = coincide[2].split(',').map(param => param.trim());
      const Cuerpo = coincide[3].trim();
      Funciones.push({ Nombre_de_la_funcion: functionName, Parametro, Cuerpo });
    }
  
    
    const V_declaraciones = /(\bint\b|\bstring\b)\s+([a-zA-Z_$][\w$]*)/g;
    const ifEstados = /if\s*\(([^)]*)\)\s*{([^}]*)}\s*(?:else\s*{([^}]*)})?/g;
  
    let variables = [];
    let variableMatch;
  
    while ((variableMatch = V_declaraciones.exec(code)) !== null) {
      const dataType = variableMatch[1];
      const variableName = variableMatch[2];
      variables.push({ dataType, variableName });
    }
  
    let Sentencias = [];
    let sentencia;
  
    while ((sentencia = ifEstados.exec(code)) !== null) {
      const condicion = sentencia[1].trim();
      const EsVerdadero = sentencia[2].trim();
      const EsFalso = sentencia[3] ? sentencia[3].trim() : null;
  
      Sentencias.push({ Tipo_Sentencia: 'if y Else', condicion, EsVerdadero, EsFalso });
    }
    
  
    return { Funciones, variables, Sentencias };
  }
  