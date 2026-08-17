export interface Program {
  lab: 'pc' | 'iot';
  number: number;
  title: string;
  description: string;
  language: string;
  code: string;
  algorithm: string;
  inputOutput: string;
}

export const programs: Program[] = [
  // PC Lab Programs (1-10)
  {
    lab: 'pc',
    number: 1,
    title: 'Hello World & Basic I/O',
    description: 'Learn to write your first C program with basic input/output operations.',
    language: 'c',
    code: '',
    algorithm: '1. Include standard I/O header\n2. Define main function\n3. Print "Hello, World!" using printf\n4. Return 0 to indicate successful execution',
    inputOutput: 'Input: None\nOutput: Hello, World!',
  },
  {
    lab: 'pc',
    number: 2,
    title: 'Variables and Data Types',
    description: 'Explore different data types in C and how to declare and use variables.',
    language: 'c',
    code: '',
    algorithm: '1. Declare variables of different types (int, float, char, double)\n2. Initialize with values\n3. Print each variable using appropriate format specifiers\n4. Demonstrate type sizes using sizeof operator',
    inputOutput: 'Input: None\nOutput: Variable values and their sizes',
  },
  {
    lab: 'pc',
    number: 3,
    title: 'Control Structures - If/Else',
    description: 'Implement conditional logic using if, else if, and else statements.',
    language: 'c',
    code: '',
    algorithm: '1. Read an integer from user\n2. Check if number is positive, negative, or zero\n3. Check if number is even or odd\n4. Print appropriate messages for each condition',
    inputOutput: 'Input: 7\nOutput: Positive\nOdd',
  },
  {
    lab: 'pc',
    number: 4,
    title: 'Loops - For, While, Do-While',
    description: 'Master different loop constructs to perform repetitive tasks.',
    language: 'c',
    code: '',
    algorithm: '1. Use for loop to print numbers 1 to 10\n2. Use while loop to calculate sum of first n natural numbers\n3. Use do-while to print multiplication table\n4. Demonstrate break and continue statements',
    inputOutput: 'Input: 5\nOutput: 1 2 3 4 5\nSum: 15\nTable of 5',
  },
  {
    lab: 'pc',
    number: 5,
    title: 'Arrays - 1D and 2D',
    description: 'Work with one-dimensional and two-dimensional arrays.',
    language: 'c',
    code: '',
    algorithm: '1. Declare and initialize 1D array\n2. Find maximum, minimum, and average\n3. Declare 2D matrix\n4. Perform matrix addition and print result',
    inputOutput: 'Input: Array elements\nOutput: Max, Min, Average\nMatrix sum',
  },
  {
    lab: 'pc',
    number: 6,
    title: 'Functions - Modular Programming',
    description: 'Create reusable code with functions, parameters, and return values.',
    language: 'c',
    code: '',
    algorithm: '1. Create function to calculate factorial\n2. Create function to check prime number\n3. Create function to swap two numbers\n4. Demonstrate call by value and call by reference',
    inputOutput: 'Input: 5\nOutput: Factorial: 120\nPrime check\nSwapped values',
  },
  {
    lab: 'pc',
    number: 7,
    title: 'Pointers Basics',
    description: 'Understand memory addresses, pointer declaration, and dereferencing.',
    language: 'c',
    code: '',
    algorithm: '1. Declare pointer variables\n2. Assign address of variables to pointers\n3. Access values through pointers\n4. Demonstrate pointer arithmetic',
    inputOutput: 'Input: Integer value\nOutput: Address and value via pointer',
  },
  {
    lab: 'pc',
    number: 8,
    title: 'Strings and String Functions',
    description: 'Manipulate character arrays and use standard string library functions.',
    language: 'c',
    code: '',
    algorithm: '1. Read string from user\n2. Calculate length using strlen\n3. Copy string using strcpy\n4. Concatenate strings using strcat\n5. Compare strings using strcmp',
    inputOutput: 'Input: "Hello" "World"\nOutput: Length: 5\nConcatenated: HelloWorld',
  },
  {
    lab: 'pc',
    number: 9,
    title: 'Structures - Custom Data Types',
    description: 'Define and use structures to group related data of different types.',
    language: 'c',
    code: '',
    algorithm: '1. Define Student structure with name, roll, marks\n2. Create array of structures\n3. Input data for multiple students\n4. Display student details and find topper',
    inputOutput: 'Input: Student records\nOutput: All records\nTopper details',
  },
  {
    lab: 'pc',
    number: 10,
    title: 'File Handling - Read/Write',
    description: 'Perform file operations: create, read, write, and append to files.',
    language: 'c',
    code: '',
    algorithm: '1. Open file in write mode\n2. Write student data to file\n3. Close and reopen in read mode\n4. Read and display file contents\n5. Demonstrate append mode',
    inputOutput: 'Input: Student data\nOutput: File contents displayed',
  },

  // IoT Lab Programs (1-10)
  {
    lab: 'iot',
    number: 1,
    title: 'Blink Five LEDs Back-Forth',
    description: 'Control an LED using GPIO pins on a microcontroller.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize GPIO pin as output\n2. Set pin HIGH to turn LED on\n3. Delay for specified time\n4. Set pin LOW to turn LED off\n4. Repeat in infinite loop',
    inputOutput: 'Input: Delay time (ms)\nOutput: LED blinking',
  },
  {
    lab: 'iot',
    number: 2,
    title: 'Button Input - Digital Read',
    description: 'Read digital input from a push button with debouncing.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize GPIO pin as input with pull-up\n2. Read button state in loop\n3. Implement software debouncing\n4. Toggle LED on button press\n5. Print state to serial monitor',
    inputOutput: 'Input: Button press\nOutput: LED toggle + Serial output',
  },
  {
    lab: 'iot',
    number: 3,
    title: 'Analog Sensor Reading - ADC',
    description: 'Read analog values from sensors using ADC (Analog to Digital Converter).',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize ADC peripheral\n2. Configure channel for sensor\n3. Read raw ADC value in loop\n4. Convert to voltage/temperature\n5. Display on serial monitor',
    inputOutput: 'Input: Analog sensor\nOutput: Voltage/Temperature readings',
  },
  {
    lab: 'iot',
    number: 4,
    title: 'PWM - LED Brightness Control',
    description: 'Control LED brightness using Pulse Width Modulation.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize PWM timer\n2. Set frequency and resolution\n3. Vary duty cycle from 0 to 100%\n4. Create fade in/out effect\n5. Control via potentiometer input',
    inputOutput: 'Input: Potentiometer value\nOutput: LED brightness change',
  },
  {
    lab: 'iot',
    number: 5,
    title: 'I2C Communication - LCD Display',
    description: 'Interface with I2C LCD display to show text and sensor data.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize I2C bus\n2. Scan for LCD address\n3. Initialize LCD controller\n4. Print static text\n5. Update with dynamic sensor data',
    inputOutput: 'Input: I2C LCD module\nOutput: Text on display',
  },
  {
    lab: 'iot',
    number: 6,
    title: 'SPI Communication - SD Card',
    description: 'Read and write data to SD card using SPI protocol.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize SPI bus\n2. Initialize SD card module\n3. Create/open file on SD card\n4. Write sensor log data\n5. Read back and verify',
    inputOutput: 'Input: Sensor data\nOutput: Data logged to SD card',
  },
  {
    lab: 'iot',
    number: 7,
    title: 'WiFi Connection - HTTP Client',
    description: 'Connect to WiFi and make HTTP requests to web APIs.',
    language: 'cpp',
    code: '',
    algorithm: '1. Initialize WiFi module\n2. Connect to access point\n3. Make GET request to API\n4. Parse JSON response\n5. Display data on serial monitor',
    inputOutput: 'Input: WiFi credentials\nOutput: API data retrieved',
  },
  {
    lab: 'iot',
    number: 8,
    title: 'MQTT - Publish/Subscribe',
    description: 'Implement MQTT protocol for IoT device communication.',
    language: 'cpp',
    code: '',
    algorithm: '1. Connect to MQTT broker\n2. Subscribe to command topic\n3. Publish sensor data periodically\n4. Handle incoming messages\n5. Control actuators based on commands',
    inputOutput: 'Input: MQTT broker details\nOutput: Bidirectional communication',
  },
  {
    lab: 'iot',
    number: 9,
    title: 'Deep Sleep - Power Management',
    description: 'Implement deep sleep mode for battery-powered IoT devices.',
    language: 'cpp',
    code: '',
    algorithm: '1. Configure wake-up sources (timer, GPIO)\n2. Perform sensor reading\n3. Transmit data\n4. Enter deep sleep mode\n5. Wake up and repeat cycle',
    inputOutput: 'Input: Sleep duration\nOutput: Periodic wake/sleep cycle',
  },
  {
    lab: 'iot',
    number: 10,
    title: 'OTA Updates - Firmware Upgrade',
    description: 'Implement Over-The-Air firmware updates for IoT devices.',
    language: 'cpp',
    code: '',
    algorithm: '1. Check for firmware updates on server\n2. Download new firmware binary\n3. Verify checksum/signature\n4. Write to OTA partition\n5. Reboot into new firmware',
    inputOutput: 'Input: OTA server URL\nOutput: Firmware updated',
  },
];

export function getProgramsByLab(lab: 'pc' | 'iot'): Program[] {
  return programs.filter((p) => p.lab === lab).sort((a, b) => a.number - b.number);
}

export function getProgram(lab: 'pc' | 'iot', number: number): Program | undefined {
  return programs.find((p) => p.lab === lab && p.number === number);
}

export function getAllPrograms(): Program[] {
  return [...programs].sort((a, b) => {
    if (a.lab !== b.lab) return a.lab === 'pc' ? -1 : 1;
    return a.number - b.number;
  });
}

// ---------------------------------------------------------------------------
// IoT Lab (new reusable structure)
// Only the following fields are used by the IoT Program Detail page:
//   id, experimentNo, title, aim, components, circuitDiagram, setup, code, result
// No program content is generated — fill these in yourself.
// Circuit images live in public/images/iot/ and are referenced from here.
// ---------------------------------------------------------------------------
export interface IoTComponent {
  name: string;
  quantity: string;
  description?: string;
}

export interface IoTProgram {
  id: string;
  experimentNo: number;
  title: string;
  aim: string;
  components: IoTComponent[];
  circuitDiagram: string;
  setup: string;
  code: string;
  result: string;
}

export const iotPrograms: IoTProgram[] = [
  {
    id: 'iot-01',
    experimentNo: 1,
    title: 'Blink Five LEDs Back-Forth',
    aim: 'Develop a program to blink 5 LEDs back and forth.',
    components: [{ name: 'Arduino Uno', quantity: '1' },
      { name: 'Jumper Cable', quantity: '6' },
      { name: 'Bread Board', quantity: '1' },
      { name: 'LED', quantity: '5' },
      { name: 'Resistance (800 Ω)', quantity: '5' },],
    circuitDiagram: '/images/iot/circuit-01.jpeg',
    setup: ` 
a) Connect the circuit as per circuit diagram.
b) Make sure VCC and Ground pins are connected properly.
c) Open Arduino IDE and select the appropriate Arduino board.
`,
    code: `int LED1 = 5;
int LED2 = 6;
int LED3 = 7;
int LED4 = 8;
int LED5 = 9;
int del = 100;

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  pinMode(LED5, OUTPUT);
}

void loop() {
  // LED1 ON
  digitalWrite(LED1, HIGH);
  delay(del);

  // LED1 OFF, LED2 ON
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, HIGH);
  delay(del);

  // LED2 OFF, LED3 ON
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, HIGH);
  delay(del);

  // LED3 OFF, LED4 ON
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, HIGH);
  delay(del);

  // LED4 OFF, LED5 ON
  digitalWrite(LED4, LOW);
  digitalWrite(LED5, HIGH);
  delay(del);

  // LED5 OFF, LED4 ON
  digitalWrite(LED5, LOW);
  digitalWrite(LED4, HIGH);
  delay(del);

  // LED4 OFF, LED3 ON
  digitalWrite(LED4, LOW);
  digitalWrite(LED3, HIGH);
  delay(del);

  // LED3 OFF, LED2 ON
  digitalWrite(LED3, LOW);
  digitalWrite(LED2, HIGH);
  delay(del);

  // LED2 OFF (reset back to LED1 on next loop)
  digitalWrite(LED2, LOW);
}`,
    result: 'Successfully demonstrated blink 5 LEDs.',
  },
  {
    id: 'iot-02',
    experimentNo: 2,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-02.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-03',
    experimentNo: 3,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-03.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-04',
    experimentNo: 4,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-04.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-05',
    experimentNo: 5,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-05.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-06',
    experimentNo: 6,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-06.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-07',
    experimentNo: 7,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-07.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-08',
    experimentNo: 8,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-08.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-09',
    experimentNo: 9,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-09.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-10',
    experimentNo: 10,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-10.png',
    setup: '',
    code: '',
    result: '',
  },
];

export function getIoTProgram(experimentNo: number): IoTProgram | undefined {
  return iotPrograms.find((p) => p.experimentNo === experimentNo);
}
