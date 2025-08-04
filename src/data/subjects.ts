import { SubjectStatus } from '@/components/SubjectNode';

export interface Subject {
  id: number;
  nivel: number;
  nombre: string;
  modalidad: string;
  correlativasRegular: number[];
  correlativasAprobada: number[];
  correlativasRendir: number[];
  cargaHoraria: number;
  electiva: boolean;
  status: SubjectStatus;
  position: { x: number; y: number };
  attempts?: number; // Contador de oportunidades para rendir final (solo para materias en estado "regular")
}

// Datos de materias de Ingeniería en Sistemas (UTN Córdoba)
const subjectsData = [
  {
    "id": 1,
    "nivel": 1,
    "nombre": "Análisis Matemático 1",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 2,
    "nivel": 1,
    "nombre": "Álgebra y Geometría Analítica",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 3,
    "nivel": 1,
    "nombre": "Física 1",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 4,
    "nivel": 1,
    "nombre": "Inglés 1",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 2,
    "electiva": false
  },
  {
    "id": 5,
    "nivel": 1,
    "nombre": "Lógica y Estructuras Discretas",
    "modalidad": "1C – CC",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 6,
    "nivel": 1,
    "nombre": "Algoritmos y Estructuras de Datos",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 7,
    "nivel": 1,
    "nombre": "Arquitectura de Computadoras",
    "modalidad": "2C – CC",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 8,
    "nivel": 1,
    "nombre": "Sistemas y Procesos de Negocio",
    "modalidad": "1C – CC",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 11,
    "nivel": 1,
    "nombre": "Ingeniería y Sociedad",
    "modalidad": "2C – CC",
    "correlativasRegular": [],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 2,
    "electiva": false
  },
  {
    "id": 9,
    "nivel": 2,
    "nombre": "Análisis Matemático 2",
    "modalidad": "A",
    "correlativasRegular": [1, 2],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 10,
    "nivel": 2,
    "nombre": "Física 2",
    "modalidad": "A",
    "correlativasRegular": [1, 3],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 5,
    "electiva": false
  },
  {
    "id": 12,
    "nivel": 2,
    "nombre": "Inglés 2",
    "modalidad": "A",
    "correlativasRegular": [4],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 2,
    "electiva": false
  },
  {
    "id": 13,
    "nivel": 2,
    "nombre": "Sintaxis y Semántica de los Lenguajes",
    "modalidad": "1C – CC",
    "correlativasRegular": [5, 6],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 14,
    "nivel": 2,
    "nombre": "Paradigmas de Programación",
    "modalidad": "2C – CC",
    "correlativasRegular": [5, 6],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 15,
    "nivel": 2,
    "nombre": "Sistemas Operativos",
    "modalidad": "A",
    "correlativasRegular": [7],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 16,
    "nivel": 2,
    "nombre": "Análisis de Sistemas de Información (Integradora)",
    "modalidad": "A",
    "correlativasRegular": [6, 8],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 6,
    "electiva": false
  },
  {
    "id": 17,
    "nivel": 2,
    "nombre": "Probabilidad y Estadísticas",
    "modalidad": "1C – CC",
    "correlativasRegular": [1, 2],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 18,
    "nivel": 3,
    "nombre": "Economía",
    "modalidad": "2C – CC",
    "correlativasRegular": [],
    "correlativasAprobada": [1, 2],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 19,
    "nivel": 3,
    "nombre": "Bases de Datos",
    "modalidad": "1C – CC",
    "correlativasRegular": [13, 16],
    "correlativasAprobada": [5, 6],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 20,
    "nivel": 3,
    "nombre": "Desarrollo de Software",
    "modalidad": "1C – CC",
    "correlativasRegular": [14, 16],
    "correlativasAprobada": [5, 6],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 21,
    "nivel": 3,
    "nombre": "Comunicación de Datos",
    "modalidad": "A",
    "correlativasRegular": [],
    "correlativasAprobada": [3, 7],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 22,
    "nivel": 3,
    "nombre": "Análisis Numérico",
    "modalidad": "2C – CC",
    "correlativasRegular": [9],
    "correlativasAprobada": [1, 2],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 23,
    "nivel": 3,
    "nombre": "Diseño de Sistemas de Información (Integradora)",
    "modalidad": "A",
    "correlativasRegular": [14, 16],
    "correlativasAprobada": [4, 6, 8],
    "correlativasRendir": [],
    "cargaHoraria": 6,
    "electiva": false
  },
  {
    "id": 99,
    "nivel": 3,
    "nombre": "Seminario Integrador (Analista)",
    "modalidad": "2C",
    "correlativasRegular": [16],
    "correlativasAprobada": [6, 8, 13, 14],
    "correlativasRendir": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 24,
    "nivel": 4,
    "nombre": "Legislación",
    "modalidad": "2C – CC",
    "correlativasRegular": [11],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 2,
    "electiva": false
  },
  {
    "id": 25,
    "nivel": 4,
    "nombre": "Ingeniería y Calidad de Software",
    "modalidad": "2C – CC",
    "correlativasRegular": [19, 20, 23],
    "correlativasAprobada": [13, 14],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 26,
    "nivel": 4,
    "nombre": "Redes de Datos",
    "modalidad": "A",
    "correlativasRegular": [15, 21],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 27,
    "nivel": 4,
    "nombre": "Investigación Operativa",
    "modalidad": "A",
    "correlativasRegular": [17, 22],
    "correlativasAprobada": [],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 28,
    "nivel": 4,
    "nombre": "Simulación",
    "modalidad": "1C – CC",
    "correlativasRegular": [17],
    "correlativasAprobada": [9],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 29,
    "nivel": 4,
    "nombre": "Tecnologías para la Automatización",
    "modalidad": "2C – CC",
    "correlativasRegular": [10, 22],
    "correlativasAprobada": [9],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 30,
    "nivel": 4,
    "nombre": "Administración de Sistemas de Información (Integradora)",
    "modalidad": "A",
    "correlativasRegular": [18, 23],
    "correlativasAprobada": [16],
    "correlativasRendir": [],
    "cargaHoraria": 6,
    "electiva": false
  },
  {
    "id": 31,
    "nivel": 5,
    "nombre": "Inteligencia Artificial",
    "modalidad": "A",
    "correlativasRegular": [28],
    "correlativasAprobada": [17, 22],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 32,
    "nivel": 5,
    "nombre": "Ciencia de Datos",
    "modalidad": "2C – CC",
    "correlativasRegular": [28],
    "correlativasAprobada": [17, 19],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 33,
    "nivel": 5,
    "nombre": "Sistemas de Gestión",
    "modalidad": "A",
    "correlativasRegular": [18, 27],
    "correlativasAprobada": [23],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 34,
    "nivel": 5,
    "nombre": "Gestión Gerencial",
    "modalidad": "1C – CC",
    "correlativasRegular": [24, 30],
    "correlativasAprobada": [18],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": false
  },
  {
    "id": 35,
    "nivel": 5,
    "nombre": "Seguridad en los Sistemas de Información",
    "modalidad": "1C – CC",
    "correlativasRegular": [26, 30],
    "correlativasAprobada": [20, 21],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": false
  },
  {
    "id": 36,
    "nivel": 5,
    "nombre": "Proyecto Final (Integradora)",
    "modalidad": "A",
    "correlativasRegular": [25, 26, 30],
    "correlativasAprobada": [12, 20, 23],
    "correlativasRendir": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 99],
    "cargaHoraria": 6,
    "electiva": false
  },
  {
    "id": 201,
    "nivel": 3,
    "nombre": "Backend de Aplicaciones",
    "modalidad": "2C",
    "correlativasRegular": [13, 14],
    "correlativasAprobada": [6],
    "correlativasRendir": [],
    "cargaHoraria": 4,
    "electiva": true
  },
  {
    "id": 202,
    "nivel": 4,
    "nombre": "Green Software",
    "modalidad": "1C – 2C",
    "correlativasRegular": [19, 20],
    "correlativasAprobada": [13, 14],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 203,
    "nivel": 4,
    "nombre": "Gestión Industrial de la Producción",
    "modalidad": "1C",
    "correlativasRegular": [19],
    "correlativasAprobada": [8, 16],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 204,
    "nivel": 4,
    "nombre": "Gestión de la Mejora de los Procesos",
    "modalidad": "1C",
    "correlativasRegular": [19],
    "correlativasAprobada": [8, 16],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 205,
    "nivel": 4,
    "nombre": "Desarrollo y Operaciones DevOps",
    "modalidad": "1C",
    "correlativasRegular": [19, 20],
    "correlativasAprobada": [13, 14],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 206,
    "nivel": 4,
    "nombre": "Desarrollo de Aplicaciones con Objetos",
    "modalidad": "2C",
    "correlativasRegular": [13],
    "correlativasAprobada": [6],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 207,
    "nivel": 4,
    "nombre": "Comunicación Multimedial en el Desarrollo de Sistemas de Información",
    "modalidad": "2C",
    "correlativasRegular": [19],
    "correlativasAprobada": [8, 16],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 208,
    "nivel": 4,
    "nombre": "Arquitectura de Software",
    "modalidad": "1C",
    "correlativasRegular": [19, 20],
    "correlativasAprobada": [13, 14],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 209,
    "nivel": 5,
    "nombre": "Desarrollo de Tecnologías Blockchain",
    "modalidad": "1C",
    "correlativasRegular": [19, 26],
    "correlativasAprobada": [14, 20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 210,
    "nivel": 5,
    "nombre": "Creatividad e Innovación en Ingeniería",
    "modalidad": "1C – 2C",
    "correlativasRegular": [30],
    "correlativasAprobada": [20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 211,
    "nivel": 5,
    "nombre": "Auditoría de SI/TI",
    "modalidad": "1C",
    "correlativasRegular": [30],
    "correlativasAprobada": [20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 212,
    "nivel": 5,
    "nombre": "Gerenciamiento Estratégico",
    "modalidad": "1C",
    "correlativasRegular": [30],
    "correlativasAprobada": [20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 213,
    "nivel": 5,
    "nombre": "Consultoría en Negocios Digitales",
    "modalidad": "2C",
    "correlativasRegular": [30],
    "correlativasAprobada": [20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 214,
    "nivel": 5,
    "nombre": "Emprendimientos Tecnológicos",
    "modalidad": "1C",
    "correlativasRegular": [30],
    "correlativasAprobada": [16, 19],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 215,
    "nivel": 5,
    "nombre": "Decisiones en Escenarios Complejos",
    "modalidad": "1C",
    "correlativasRegular": [27],
    "correlativasAprobada": [19],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 216,
    "nivel": 5,
    "nombre": "Testing de Software",
    "modalidad": "2C",
    "correlativasRegular": [25],
    "correlativasAprobada": [19, 20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 217,
    "nivel": 5,
    "nombre": "Seguridad en el Desarrollo de Software",
    "modalidad": "2C",
    "correlativasRegular": [19, 26],
    "correlativasAprobada": [8, 20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 218,
    "nivel": 5,
    "nombre": "Integración de Aplicaciones en Entorno Web",
    "modalidad": "2C",
    "correlativasRegular": [26],
    "correlativasAprobada": [19, 20],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  },
  {
    "id": 219,
    "nivel": 5,
    "nombre": "Ingeniería de Software de fuentes abiertas/libres",
    "modalidad": "2C",
    "correlativasRegular": [19, 20, 26],
    "correlativasAprobada": [13, 14],
    "correlativasRendir": [],
    "cargaHoraria": 3,
    "electiva": true
  }
];

// Función para calcular posiciones automáticamente
function calculatePosition(id: number, nivel: number): { x: number; y: number } {
  const levelSpacing = 300; // Espacio horizontal entre niveles
  const nodeSpacing = 120; // Espacio vertical entre nodos
  
  // Obtener todos los nodos del mismo nivel
  const sameLevelNodes = subjectsData.filter(s => s.nivel === nivel);
  const indexInLevel = sameLevelNodes.findIndex(s => s.id === id);
  
  // Calcular posición
  const x = (nivel - 1) * levelSpacing + 50;
  const y = indexInLevel * nodeSpacing + 50;
  
  return { x, y };
}

// Convertir a la estructura con posiciones y status
export const subjects: Subject[] = subjectsData.map(subject => ({
  ...subject,
  status: (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0) ? 'available' : 'locked' as SubjectStatus,
  position: calculatePosition(subject.id, subject.nivel)
}));

// Generar edges automáticamente basado en correlativas
function generateEdges(): Array<{ id: string; source: string; target: string; type: string }> {
  const edges: Array<{ id: string; source: string; target: string; type: string }> = [];
  let edgeId = 1;
  
  subjects.forEach(subject => {
    // Crear edges para correlativas regulares
    subject.correlativasRegular.forEach(prereqId => {
      edges.push({
        id: `e${edgeId++}`,
        source: prereqId.toString(),
        target: subject.id.toString(),
        type: 'smoothstep'
      });
    });
    
    // Crear edges para correlativas aprobadas (con estilo diferente)
    subject.correlativasAprobada.forEach(prereqId => {
      edges.push({
        id: `e${edgeId++}`,
        source: prereqId.toString(),
        target: subject.id.toString(),
        type: 'smoothstep'
      });
    });
  });
  
  return edges;
}

export const edges = generateEdges();