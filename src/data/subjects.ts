import { SubjectStatus } from '@/components/SubjectNode';

export interface Subject {
  id: string;
  name: string;
  year: number;
  code: string;
  status: SubjectStatus;
  prerequisites: string[];
  position: { x: number; y: number };
}

// Datos de materias de Ingeniería en Sistemas (UTN Córdoba) - Ajustado para móvil
export const subjects: Subject[] = [
  // 1er Año
  {
    id: 'mat1',
    name: 'Análisis Matemático I',
    year: 1,
    code: 'AM1',
    status: 'available',
    prerequisites: [],
    position: { x: 20, y: 20 }
  },
  {
    id: 'alg1',
    name: 'Álgebra y Geometría Analítica',
    year: 1,
    code: 'AGA',
    status: 'available',
    prerequisites: [],
    position: { x: 20, y: 140 }
  },
  {
    id: 'sys1',
    name: 'Sistemas de Representación',
    year: 1,
    code: 'SR',
    status: 'available',
    prerequisites: [],
    position: { x: 20, y: 260 }
  },
  {
    id: 'ing1',
    name: 'Inglés I',
    year: 1,
    code: 'ING1',
    status: 'available',
    prerequisites: [],
    position: { x: 20, y: 380 }
  },
  {
    id: 'fis1',
    name: 'Física I',
    year: 1,
    code: 'FIS1',
    status: 'available',
    prerequisites: [],
    position: { x: 180, y: 20 }
  },
  
  // 2do Año
  {
    id: 'mat2',
    name: 'Análisis Matemático II',
    year: 2,
    code: 'AM2',
    status: 'locked',
    prerequisites: ['mat1'],
    position: { x: 340, y: 20 }
  },
  {
    id: 'prog1',
    name: 'Programación I',
    year: 2,
    code: 'PROG1',
    status: 'locked',
    prerequisites: ['alg1'],
    position: { x: 340, y: 140 }
  },
  {
    id: 'fis2',
    name: 'Física II',
    year: 2,
    code: 'FIS2',
    status: 'locked',
    prerequisites: ['fis1', 'mat1'],
    position: { x: 340, y: 260 }
  },
  {
    id: 'ing2',
    name: 'Inglés II',
    year: 2,
    code: 'ING2',
    status: 'locked',
    prerequisites: ['ing1'],
    position: { x: 340, y: 380 }
  },
  {
    id: 'quim1',
    name: 'Química',
    year: 2,
    code: 'QUIM',
    status: 'available',
    prerequisites: [],
    position: { x: 180, y: 140 }
  },
  
  // 3er Año
  {
    id: 'prog2',
    name: 'Programación II',
    year: 3,
    code: 'PROG2',
    status: 'locked',
    prerequisites: ['prog1'],
    position: { x: 500, y: 140 }
  },
  {
    id: 'est1',
    name: 'Estadística',
    year: 3,
    code: 'EST',
    status: 'locked',
    prerequisites: ['mat2'],
    position: { x: 500, y: 20 }
  },
  {
    id: 'arq1',
    name: 'Arquitectura de Computadoras',
    year: 3,
    code: 'ARQ',
    status: 'locked',
    prerequisites: ['fis2'],
    position: { x: 500, y: 260 }
  },
  {
    id: 'so1',
    name: 'Sistemas Operativos',
    year: 3,
    code: 'SO',
    status: 'locked',
    prerequisites: ['prog2'],
    position: { x: 660, y: 140 }
  },
  
  // 4to Año
  {
    id: 'bd1',
    name: 'Base de Datos',
    year: 4,
    code: 'BD',
    status: 'locked',
    prerequisites: ['prog2'],
    position: { x: 660, y: 20 }
  },
  {
    id: 'redes1',
    name: 'Redes de Datos',
    year: 4,
    code: 'REDES',
    status: 'locked',
    prerequisites: ['arq1'],
    position: { x: 660, y: 260 }
  }
];

export const edges = [
  // AM1 -> AM2
  { id: 'e1', source: 'mat1', target: 'mat2', type: 'smoothstep' },
  // AGA -> PROG1
  { id: 'e2', source: 'alg1', target: 'prog1', type: 'smoothstep' },
  // FIS1 -> FIS2
  { id: 'e3', source: 'fis1', target: 'fis2', type: 'smoothstep' },
  // AM1 -> FIS2
  { id: 'e4', source: 'mat1', target: 'fis2', type: 'smoothstep' },
  // ING1 -> ING2
  { id: 'e5', source: 'ing1', target: 'ing2', type: 'smoothstep' },
  // PROG1 -> PROG2
  { id: 'e6', source: 'prog1', target: 'prog2', type: 'smoothstep' },
  // AM2 -> EST
  { id: 'e7', source: 'mat2', target: 'est1', type: 'smoothstep' },
  // FIS2 -> ARQ
  { id: 'e8', source: 'fis2', target: 'arq1', type: 'smoothstep' },
  // PROG2 -> SO
  { id: 'e9', source: 'prog2', target: 'so1', type: 'smoothstep' },
  // PROG2 -> BD
  { id: 'e10', source: 'prog2', target: 'bd1', type: 'smoothstep' },
  // ARQ -> REDES
  { id: 'e11', source: 'arq1', target: 'redes1', type: 'smoothstep' }
];