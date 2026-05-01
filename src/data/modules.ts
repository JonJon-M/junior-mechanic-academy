export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  content: string;
  funFact?: string;
  analogy?: string;
  xpReward: number;
}

export interface Module {
  id: string;
  level: number;
  title: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  badge: { id: string; name: string; emoji: string; description: string };
  xpTotal: number;
  unlockRequirement: number; // total XP needed to unlock
}

export const MODULES: Module[] = [
  {
    id: 'level-1',
    level: 1,
    title: 'How Cars Work',
    emoji: '🚗',
    description: 'Start your journey! Learn the basics of what makes a car go vroom.',
    color: '#E53E3E',
    bgColor: '#742A2A',
    unlockRequirement: 0,
    xpTotal: 200,
    badge: { id: 'car-basics', name: 'Car Whiz', emoji: '🏎️', description: 'Learned the basics of how cars work!' },
    lessons: [
      {
        id: 'l1-what-is-engine',
        title: 'What is an Engine?',
        emoji: '⚙️',
        xpReward: 30,
        content: `An **engine** is like the heart of a car — it's what gives the car its energy to move!

Think of it this way: you eat food, your body turns it into energy, and you can run and jump. A car does the same thing — but instead of food, it uses **fuel** (like petrol or diesel). The engine burns that fuel and turns it into **power** that spins the wheels.

Inside most car engines, there are **cylinders** — metal tubes where tiny explosions happen over and over, thousands of times every minute. Each explosion pushes a **piston** (a metal plug) up and down. All those pistons moving together create a spinning force called **torque**, and that's what moves your car!

🔥 **The engine gets really hot** during all these explosions — over 1,000°C inside the cylinders! That's why cars need a cooling system (we'll learn about that later).`,
        funFact: 'Did you know? The fastest car engines can spin 20,000 times every minute — that\'s faster than a blender!',
        analogy: 'An engine is like a very strong person pedalling a bicycle really fast inside your car!',
      },
      {
        id: 'l1-four-parts',
        title: 'The 4 Things Every Car Needs',
        emoji: '🔧',
        xpReward: 30,
        content: `Every car — no matter how big or small — needs these **4 things** to work:

**1. 🔥 Engine** — The powerhouse! Burns fuel to create movement. Without it, the car is just a very expensive chair.

**2. ⛽ Fuel** — The food for the engine! Most cars use petrol or diesel. Electric cars use electricity stored in a huge battery instead.

**3. 🛞 Wheels & Tyres** — These touch the road and move the car forward. The engine's power travels all the way to the wheels through a system called the **drivetrain**.

**4. 🎯 Steering** — This lets the driver point the car where they want to go. When you turn the steering wheel, it pushes the front wheels left or right.

**Bonus: Brakes!** 🛑 Okay, there's actually a 5th essential thing — brakes! Because what's the point of going fast if you can't stop safely?`,
        funFact: 'The very first cars in the 1880s used steam engines — they burned coal and water to create steam power!',
        analogy: 'A car is like a person: the engine is the legs, fuel is the food, wheels are the shoes, and steering is the brain deciding where to go!',
      },
      {
        id: 'l1-labelling',
        title: 'Car Parts Labelling Game',
        emoji: '🎮',
        xpReward: 40,
        content: `Now let's practise what you've learned!

A car has LOTS of parts, but here are the main ones a junior mechanic needs to know:

**Under the bonnet (hood):**
- **Engine** — the main power unit
- **Battery** — stores electricity to start the car
- **Radiator** — keeps the engine cool
- **Air filter** — cleans the air going into the engine

**On the outside:**
- **Bonnet/Hood** — the lid over the engine
- **Exhaust pipe** — lets burnt gas escape from the engine
- **Fuel cap** — where you put petrol in
- **Tyres** — the rubber rings that grip the road

**Inside the car:**
- **Steering wheel** — turns the front wheels
- **Dashboard** — shows speed, fuel, and warning lights
- **Gear lever** — changes how much power goes to the wheels`,
        funFact: 'Cars have over 30,000 individual parts — that\'s more pieces than a jigsaw puzzle!',
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What does an engine use to create power?',
        options: ['Water', 'Fuel (petrol or diesel)', 'Air', 'Sand'],
        correct: 1,
        explanation: 'Engines burn fuel — like petrol or diesel — to create the explosions that power the car!',
      },
      {
        id: 'q1-2',
        question: 'What are the 4 things every car needs?',
        options: [
          'Engine, Music, Wheels, Colour',
          'Engine, Fuel, Wheels, Steering',
          'Battery, Radio, Seats, Windows',
          'Tyres, Paint, Glass, Doors',
        ],
        correct: 1,
        explanation: 'Every car needs an Engine (power), Fuel (energy), Wheels (movement), and Steering (direction)!',
      },
      {
        id: 'q1-3',
        question: 'What is a piston?',
        options: [
          'A type of tyre',
          'A metal plug that moves up and down inside the engine',
          'A button on the dashboard',
          'The steering wheel',
        ],
        correct: 1,
        explanation: 'Pistons are metal plugs inside the engine cylinders. They move up and down when fuel explodes, creating power!',
      },
      {
        id: 'q1-4',
        question: 'What does the radiator do?',
        options: [
          'Plays music',
          'Helps the car go faster',
          'Keeps the engine cool',
          'Stores the fuel',
        ],
        correct: 2,
        explanation: 'The radiator cools the engine by circulating water/coolant to absorb heat. Without it, the engine would overheat!',
      },
    ],
  },
  {
    id: 'level-2',
    level: 2,
    title: 'The Engine',
    emoji: '⚙️',
    description: 'Dive deep into the heart of the car — learn how engines really work!',
    color: '#ED8936',
    bgColor: '#7B341E',
    unlockRequirement: 150,
    xpTotal: 250,
    badge: { id: 'engine-expert', name: 'Engine Expert', emoji: '⚙️', description: 'Mastered the secrets of car engines!' },
    lessons: [
      {
        id: 'l2-four-stroke',
        title: 'The 4-Stroke Cycle',
        emoji: '🔄',
        xpReward: 40,
        content: `Most car engines work using the **4-stroke cycle** — four steps that happen inside each cylinder to create power. Let's walk through each step:

**Stroke 1: INTAKE 💨**
The piston moves DOWN. This pulls a mix of air and fuel into the cylinder — like breathing in. The inlet valve opens to let the mixture in.

**Stroke 2: COMPRESSION 💪**
The piston moves back UP with the valves closed. This squishes (compresses) the air-fuel mixture into a tiny space, making it highly explosive — like squeezing a spring.

**Stroke 3: COMBUSTION (POWER) 🔥**
BANG! A spark plug creates a tiny spark that ignites the compressed mixture. The explosion forces the piston DOWN really hard — this is where the power comes from!

**Stroke 4: EXHAUST 💨**
The piston moves UP again. The exhaust valve opens and the burnt gases are pushed out — like breathing out. These gases travel out through the exhaust pipe.

Then it all starts again... thousands of times every minute!`,
        funFact: 'In a V8 engine (8 cylinders), there are 8 pistons doing this dance together in a carefully timed sequence — like a musical orchestra!',
        analogy: 'The 4-stroke cycle is like breathing: IN (intake), SQUEEZE (compression), FIRE (combustion), OUT (exhaust)!',
      },
      {
        id: 'l2-horsepower',
        title: 'Horsepower & Torque',
        emoji: '💪',
        xpReward: 35,
        content: `When people talk about how powerful a car is, they use two words: **horsepower** and **torque**. Let's break them down!

**🐎 Horsepower (HP)**
A long time ago, engineers compared engine power to horses. One "horsepower" is the power needed to lift 550 pounds one foot in the air in one second. A family car might have 150 horsepower — so it's like having 150 horses pushing you! A sports car can have 500+ horsepower.

**Superpower analogy:** Horsepower is like The Flash — it's about how FAST you can go!

**🔩 Torque**
Torque is the turning, twisting force that the engine creates. It's what helps you accelerate from a stop and what big trucks need to carry heavy loads.

**Superpower analogy:** Torque is like The Hulk — it's about raw STRENGTH and pulling power!

**The difference?** High horsepower = fast top speed. High torque = strong pulling force and quick acceleration.

That's why racing cars have high horsepower but big trucks and tractors have high torque!`,
        funFact: 'The most powerful production car engine ever made produces over 1,600 horsepower — that\'s like having 1,600 horses!',
        analogy: 'Horsepower is how fast you can run, torque is how heavy a backpack you can carry while running!',
      },
      {
        id: 'l2-engine-types',
        title: 'Types of Engines',
        emoji: '🔋',
        xpReward: 35,
        content: `Not all car engines are the same! Here are the three main types you'll see today:

**⛽ Petrol Engine (Gasoline)**
The most common type. Burns petrol to create power. Makes that classic "vroom" sound. Most family cars and sports cars use these.
- Fast and great for high speeds
- Less good for the environment due to CO2 emissions

**🛢️ Diesel Engine**
Burns diesel fuel, which is thicker than petrol. Used a lot in trucks, buses, and vans.
- More fuel-efficient (goes further per litre)
- More torque, great for heavy loads
- Louder and produces more NOx emissions

**⚡ Electric Motor**
Not really an "engine" — it's a motor powered by electricity from a huge battery pack. Electric cars like Teslas use these.
- Zero direct emissions (great for the environment!)
- Incredibly smooth and quiet
- Instant torque — super fast from 0 to 60!
- Need to recharge instead of refuel

**🔀 Hybrid**
Some cars use BOTH a petrol engine AND an electric motor. This gives the best of both worlds — the range of petrol with some electric efficiency.`,
        funFact: 'Electric motors are actually more efficient than petrol engines. A petrol engine wastes about 70% of its fuel energy as heat, while an electric motor converts over 90% of its energy into movement!',
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What are the 4 strokes in the engine cycle? (in order)',
        options: [
          'Start, Go, Slow, Stop',
          'Intake, Compression, Combustion, Exhaust',
          'Open, Close, Fire, Cool',
          'Push, Pull, Spin, Stop',
        ],
        correct: 1,
        explanation: 'The four strokes are: Intake (air+fuel in), Compression (squeeze it), Combustion (fire!), Exhaust (burnt gases out).',
      },
      {
        id: 'q2-2',
        question: 'What creates the spark that ignites the fuel in a petrol engine?',
        options: ['The battery', 'The radiator', 'A spark plug', 'The exhaust pipe'],
        correct: 2,
        explanation: 'Spark plugs create a tiny electrical spark at exactly the right moment to ignite the compressed fuel-air mixture!',
      },
      {
        id: 'q2-3',
        question: 'Which best describes TORQUE?',
        options: [
          'How fast the car can go',
          'How many cylinders the engine has',
          'The twisting/pulling force the engine makes',
          'How much fuel the tank holds',
        ],
        correct: 2,
        explanation: 'Torque is the rotational force — think of it as the engine\'s pulling strength. High torque helps trucks pull heavy loads!',
      },
      {
        id: 'q2-4',
        question: 'Which type of engine produces zero direct emissions?',
        options: ['Petrol engine', 'Diesel engine', 'Steam engine', 'Electric motor'],
        correct: 3,
        explanation: 'Electric motors produce zero direct emissions because they run on electricity, not burning fuel. They\'re much better for the environment!',
      },
      {
        id: 'q2-5',
        question: 'A car with HIGH HORSEPOWER is best at:',
        options: [
          'Carrying very heavy loads',
          'Achieving high top speeds',
          'Getting good fuel economy',
          'Being very quiet',
        ],
        correct: 1,
        explanation: 'Horsepower is about speed! High horsepower engines are designed to go very fast. Torque is better for hauling heavy things.',
      },
    ],
  },
  {
    id: 'level-3',
    level: 3,
    title: 'Car Systems',
    emoji: '🔌',
    description: 'Explore all the amazing systems working together to keep your car running!',
    color: '#48BB78',
    bgColor: '#22543D',
    unlockRequirement: 350,
    xpTotal: 300,
    badge: { id: 'systems-pro', name: 'Systems Pro', emoji: '🔌', description: 'Understands all car systems like a pro!' },
    lessons: [
      {
        id: 'l3-fuel-system',
        title: 'The Fuel System',
        emoji: '⛽',
        xpReward: 40,
        content: `The **fuel system** is like the car's digestive system — it takes fuel from the tank and delivers it to the engine, just like your body takes food and sends nutrients to your muscles!

**Here's the journey fuel takes:**

1. **Fuel Tank** ⛽ — This is the storage container, usually under the back of the car. It holds litres and litres of petrol or diesel.

2. **Fuel Pump** — A small electric pump that pushes fuel from the tank towards the engine. Without it, gravity alone wouldn't get fuel to the engine fast enough.

3. **Fuel Filter** — Like a sieve! It removes any dirt or particles from the fuel before it reaches the engine. Clean fuel = happy engine.

4. **Fuel Injectors** — Tiny nozzles that spray an ultra-fine mist of fuel into the engine cylinders. Modern cars use **direct injection** — the fuel goes straight into the cylinder at very high pressure.

5. **Back to engine** — The air and fuel mix together and get ignited by the spark plug.

**Diesel is different:** Diesel engines don't use spark plugs! Diesel ignites by being squeezed so hard it heats up and catches fire on its own. This is called **compression ignition**.`,
        funFact: 'A fuel injector sprays fuel at up to 2,000 times per second! The holes in the nozzle are thinner than a human hair.',
        analogy: 'The fuel system is like your school lunch box — the tank is the box, the pump is your hand, the filter makes sure nothing gross gets in, and the injectors are like your mouth delivering food to your body!',
      },
      {
        id: 'l3-cooling',
        title: 'The Cooling System',
        emoji: '💧',
        xpReward: 40,
        content: `Engines create MASSIVE amounts of heat — we're talking over 1,000°C in the cylinders! Without a cooling system, the engine would melt itself in minutes. The cooling system is the car's air conditioning for the engine!

**Key parts of the cooling system:**

**💧 Coolant (Antifreeze)** — A special liquid (usually blue or green) that doesn't boil easily. It flows around the engine absorbing heat, then goes to the radiator to release that heat.

**🔄 Water Pump** — Keeps the coolant flowing in a loop around the engine and radiator. It's powered by the engine via a belt.

**🌡️ Thermostat** — A smart valve that controls the coolant flow. When the engine is cold (just started), it stays closed to let the engine warm up faster. Once hot enough, it opens to let coolant circulate.

**🔲 Radiator** — The big flat panel at the front of the car. Hot coolant passes through lots of tiny pipes, and air flowing through cools it down — like blowing on hot soup!

**💨 Cooling Fan** — When the car is stationary (in traffic), there's not enough airflow, so an electric fan blows air through the radiator.

**The coolant loop:** Engine → Water pump pushes it → Thermostat opens → Radiator cools it → Back to engine`,
        funFact: 'The coolant in your car has to work in BOTH hot summers (not boil above 120°C) AND cold winters (not freeze below -30°C). That\'s why it\'s called antifreeze!',
        analogy: 'The cooling system is like sweating! Just as you sweat to cool down after exercise, the coolant absorbs heat from the engine and the radiator releases it into the air.',
      },
      {
        id: 'l3-electrical',
        title: 'The Electrical System',
        emoji: '⚡',
        xpReward: 40,
        content: `Modern cars are basically computers on wheels! The electrical system powers EVERYTHING — from starting the engine to your music to the safety systems.

**🔋 The Battery**
The 12-volt battery under the bonnet is like the car's backup power supply. It gives the initial burst of electricity to start the engine. But once the engine runs, the battery actually recharges itself!

**⚡ The Alternator**
This is the car's generator. It's powered by the running engine (via a belt) and produces electricity to:
- Recharge the battery
- Power all the electronics while driving
- Keep everything running

Think of it like: the battery is a charged phone, the alternator is the charger, and the engine being on is like being plugged in!

**🔩 Spark Plugs**
These create the electrical spark that ignites the fuel. Each cylinder has one spark plug. They need to be replaced every 30,000-100,000 miles as they wear out.

**🔌 The Fuse Box**
A box of safety switches! If something electrical goes wrong and too much electricity flows, the fuse "blows" (breaks) to protect the wiring from catching fire. It's like a safety valve.

**💡 Modern electronics** also include: engine computer (ECU), ABS brakes, airbags, traction control, and sat-nav — all electrical!`,
        funFact: 'A modern car can have over 100 computers (called ECUs — Electronic Control Units) working together. Your family car has more computing power than the Apollo spacecraft that went to the moon!',
      },
      {
        id: 'l3-brakes',
        title: 'The Braking System',
        emoji: '🛑',
        xpReward: 40,
        content: `Brakes are arguably the MOST important safety system in a car. They have to slow down a heavy, fast-moving vehicle — safely, every time. There are two main types:

**💿 Disc Brakes (most common today)**
Imagine a spinning dinner plate — that's the brake disc (also called a rotor). When you press the brake pedal:
1. Brake fluid is pushed through pipes to the wheel
2. A caliper (like a clamp) squeezes brake pads against the spinning disc
3. Friction slows the disc, which slows the wheel

Disc brakes are better for fast, repeated stopping — like in sports cars or on front wheels.

**🥁 Drum Brakes (older/rear wheels)**
Inside a metal drum that spins with the wheel:
1. Curved brake shoes press outward against the inside of the drum
2. Friction slows the drum down

Drum brakes are cheaper but get hot faster. Still used on rear wheels of some cars.

**🔴 Brake Fluid**
This special liquid transmits the pressure from your foot on the pedal all the way to the brakes at each wheel. It travels through small pipes called brake lines. Brake fluid must NEVER be mixed with other fluids — it could cause total brake failure!

**ABS (Anti-lock Braking System)** — A computer that stops the brakes from locking up during emergency stops, so the driver can still steer while braking hard.`,
        funFact: 'Racing cars use carbon-ceramic disc brakes that glow orange-red when hot — reaching over 1,000°C during hard braking! They\'re 50% lighter than steel brakes.',
        analogy: 'Disc brakes are like pinching a spinning CD between your fingers — the friction slows it down!',
      },
      {
        id: 'l3-suspension',
        title: 'Suspension & Steering',
        emoji: '🌀',
        xpReward: 40,
        content: `**Suspension: The Car's Shock Absorbers**

Roads aren't perfectly smooth — there are bumps, potholes, and uneven surfaces. Without suspension, every bump would be felt directly by the passengers — like riding a bicycle over rocks!

The suspension system uses **springs** and **dampers (shock absorbers)** to:
- Absorb bumps so passengers stay comfortable
- Keep the tyres in contact with the road
- Maintain steering control over rough surfaces

**Types of springs:**
- **Coil springs** — like big metal spirals
- **Leaf springs** — flat strips of metal stacked up (used in trucks)
- **Air suspension** — some luxury cars use inflatable air bags!

**Shock absorbers** (dampers) stop the car from bouncing like a trampoline after hitting a bump. Without them, you'd bounce up and down forever!

---

**Steering: Pointing the Car**

**Rack and Pinion Steering** — the most common type. When you turn the steering wheel, it turns a gear (pinion) that moves a rod (rack) left or right, which turns the front wheels.

**Power Steering** — Makes turning easy! Uses hydraulic fluid or an electric motor to assist the driver. Try turning a parked car's steering wheel without power steering — it's really hard!

**Four-Wheel Steering** — Some advanced cars can turn all four wheels for better handling at high speeds!`,
        funFact: 'Formula 1 cars have super-stiff suspension with very little travel — just 25mm! This makes them incredibly fast around corners but extremely uncomfortable. The drivers feel every tiny bump!',
        analogy: 'Shock absorbers are like the springs in your shoes — they cushion every step you take!',
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'What does the radiator do in the cooling system?',
        options: [
          'Adds fuel to the engine',
          'Releases the heat absorbed by the coolant into the air',
          'Starts the engine',
          'Controls the steering',
        ],
        correct: 1,
        explanation: 'The radiator cools down the hot coolant by passing it through thin pipes with air flowing over them — like blowing on hot soup!',
      },
      {
        id: 'q3-2',
        question: 'What is the job of the alternator?',
        options: [
          'To store fuel',
          'To cool the engine',
          'To generate electricity and recharge the battery while the engine runs',
          'To control the brakes',
        ],
        correct: 2,
        explanation: 'The alternator is the car\'s generator — it makes electricity to power everything and recharge the battery while the engine is running!',
      },
      {
        id: 'q3-3',
        question: 'In disc brakes, what creates the friction that slows the car?',
        options: [
          'Air blowing on the wheel',
          'Water sprayed on the tyre',
          'Brake pads squeezing against a spinning disc',
          'A parachute at the back',
        ],
        correct: 2,
        explanation: 'Brake pads are clamped against the spinning brake disc by the caliper. The friction between pad and disc slows the wheel down!',
      },
      {
        id: 'q3-4',
        question: 'What does ABS stand for and what does it do?',
        options: [
          'Auto Battery System — it charges the battery',
          'Anti-lock Braking System — stops wheels locking up so you can steer during emergency braking',
          'Air Brake System — uses air to stop the car',
          'Automatic Braking Speed — makes the car go slower',
        ],
        correct: 1,
        explanation: 'ABS (Anti-lock Braking System) uses sensors to detect when wheels are about to lock up and rapidly releases/reapplies brakes so you can still steer!',
      },
    ],
  },
  {
    id: 'level-4',
    level: 4,
    title: 'Maintenance & Diagnostics',
    emoji: '🔍',
    description: 'Learn to look after cars and figure out what\'s wrong when they break!',
    color: '#4299E1',
    bgColor: '#2A4365',
    unlockRequirement: 600,
    xpTotal: 300,
    badge: { id: 'oil-change-pro', name: 'Oil Change Pro', emoji: '🛢️', description: 'Knows how to maintain and diagnose car problems!' },
    lessons: [
      {
        id: 'l4-oil-change',
        title: 'Why We Change Engine Oil',
        emoji: '🛢️',
        xpReward: 40,
        content: `Engine oil is the lifeblood of an engine! Without it, all the metal parts would grind against each other and the engine would be destroyed in minutes. Let's understand why oil matters so much.

**What does oil do?**
- **Lubrication** — Creates a thin film between moving metal parts so they don't grind together
- **Cooling** — Carries heat away from parts the coolant can't reach
- **Cleaning** — Picks up tiny metal particles and combustion debris
- **Protection** — Prevents rust inside the engine

**Why does oil need changing?**
Over time, oil breaks down (degrades) and gets full of contaminants — tiny metal particles, combustion byproducts, and carbon deposits. Old, dirty oil is thick and dark (almost black) and can't lubricate properly.

**When to change oil:**
Most modern cars: every 10,000–15,000 km or every 12 months
Older cars: every 5,000 km
Always check your car's manual!

**The oil change process:**
1. Warm up the engine (warm oil flows easier)
2. Remove the drain plug under the car — old oil flows out
3. Replace the oil filter (catches the gunk)
4. Put the drain plug back
5. Pour in fresh, clean oil through the oil filler cap on top

**Dipstick check** — A long metal stick that dips into the oil reservoir. Pull it out, wipe it, put it back, pull it out again. The oil level should be between the MIN and MAX marks!`,
        funFact: 'Some premium synthetic oils can last 20,000 km between changes! These are made in a lab rather than pumped from the ground, and they stay cleaner for longer.',
        analogy: 'Changing engine oil is like changing the water in a fish tank — the old dirty water needs to go and fresh clean water keeps the fish healthy!',
      },
      {
        id: 'l4-warning-lights',
        title: 'Dashboard Warning Lights',
        emoji: '💡',
        xpReward: 40,
        content: `Your car's dashboard is like a message board from the car to the driver. Warning lights use a **traffic light colour system**:

🟢 **Green** = Information only (e.g., headlights are on, indicator is flashing) — no problem!

🟡 **Amber/Yellow** = Caution — something needs attention soon but not immediately dangerous

🔴 **Red** = WARNING — stop the car safely as soon as possible!

**The most important warning lights:**

🔴 **Oil Pressure** (oil can icon) — Pull over immediately! No oil pressure means the engine will be destroyed in minutes. Turn off the engine!

🔴 **Engine Temperature** (thermometer in water) — Engine is overheating! Pull over, turn off, let it cool. NEVER open the radiator cap when hot.

🔴 **Battery** (rectangle with +/-) — Electrical system problem. The alternator may have failed. Drive to a garage quickly before the battery dies.

🟡 **Check Engine** (engine outline) — The car's computer has detected a fault. It could be anything from a loose fuel cap to a serious issue. Get it scanned with a diagnostic computer.

🟡 **Tyre Pressure** (flat tyre icon) — A tyre is losing air pressure. Check all tyres at a petrol station.

🟡 **Service Due** (spanner/wrench icon) — Time for a routine service. Not urgent but don't ignore it for long.`,
        funFact: 'Modern cars have over 50 different warning lights! The "check engine" light alone can be triggered by over 1,400 different fault codes.',
      },
      {
        id: 'l4-tools',
        title: 'The Mechanic\'s Toolbox',
        emoji: '🧰',
        xpReward: 35,
        content: `Every mechanic needs the right tools! Here are the essential tools in a junior mechanic's toolbox:

**🔧 Spanners (Wrenches)**
Used to tighten or loosen bolts and nuts. They come in different sizes measured in millimetres (mm). A mechanic might have 20+ spanners!
- **Combination spanner** — open end on one side, ring on the other
- **Socket set** — ratchet handle with attachable sockets for different bolt sizes

**🪛 Screwdrivers**
- **Flathead** — for straight-slot screws
- **Phillips** — for cross-head screws
- **Torx** — for star-shaped screws (common in modern cars)

**🔨 Torque Wrench**
A special wrench that clicks when you've tightened a bolt to exactly the right amount. Too loose = falls off, too tight = bolt snaps. Wheel nuts need precise torque!

**⬆️ Car Jack & Jack Stands**
Used to lift the car off the ground safely. NEVER crawl under a car supported only by a jack — always use jack stands!

**🔬 Multimeter**
Measures voltage and current in electrical circuits. Essential for diagnosing electrical problems.

**💻 OBD-II Scanner**
Plugs into a port under the dashboard and reads fault codes from the car's computer. Like a doctor's stethoscope for cars!`,
        funFact: 'The torque wrench was invented in 1918! Before that, mechanics had to guess how tight was tight enough — leading to lots of bolts either falling off or snapping.',
      },
      {
        id: 'l4-sounds',
        title: 'What Different Car Sounds Mean',
        emoji: '🔊',
        xpReward: 40,
        content: `A good mechanic can LISTEN to a car and often guess what's wrong! Here's a guide to car sounds:

**🔊 GRINDING when braking**
Most likely: Brake pads have worn down completely. Metal is grinding against metal. Get this fixed IMMEDIATELY — it's dangerous!

**💨 HISSING under the bonnet**
Most likely: Coolant or vacuum line leak. If steam is coming out, the engine is overheating. Pull over!

**🔔 KNOCKING from the engine (rhythmic)**
Most likely: "Engine knock" — the fuel is igniting at the wrong time, or worn engine bearings. Needs urgent attention before engine damage occurs.

**🦗 SQUEALING/SQUEAKING when turning**
Most likely: Power steering fluid is low, or the serpentine belt is slipping. Less urgent but needs checking.

**💥 CLUNKING/BANGING over bumps**
Most likely: Worn suspension components — shock absorbers, ball joints, or anti-roll bar bushes. Affects handling and safety.

**🔁 CLICKING when turning (front-wheel drive cars)**
Most likely: CV joint (constant velocity joint) is worn. The clicking is most obvious when turning sharply and accelerating.

**🎵 HIGH-PITCHED WHINING that changes with speed**
Most likely: Wheel bearing is failing. A wheel bearing lets the wheel spin smoothly — when it fails, you get a whining or humming noise.`,
        funFact: 'Professional mechanics use a **stethoscope** (yes, like doctors use!) pressed against parts of the engine to pinpoint where a noise is coming from.',
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What colour are URGENT warning lights that mean stop the car now?',
        options: ['Green', 'Blue', 'Yellow', 'Red'],
        correct: 3,
        explanation: 'Red warning lights are URGENT! They mean stop the car safely as soon as possible. Examples: oil pressure warning and engine temperature.',
      },
      {
        id: 'q4-2',
        question: 'Why do we change engine oil regularly?',
        options: [
          'To make the car go faster',
          'Because old oil breaks down and gets dirty, losing its ability to lubricate the engine',
          'To change the colour of the oil',
          'Because the engine eats the oil',
        ],
        correct: 1,
        explanation: 'Oil breaks down over time and collects contaminants. Old, dirty oil can\'t lubricate effectively, leading to engine wear and damage!',
      },
      {
        id: 'q4-3',
        question: 'What does an OBD-II scanner do?',
        options: [
          'It measures tyre pressure',
          'It reads fault codes from the car\'s computer to help diagnose problems',
          'It changes the engine oil automatically',
          'It controls the radio',
        ],
        correct: 1,
        explanation: 'An OBD-II (On-Board Diagnostics) scanner connects to the car\'s computer and reads stored fault codes — like a diagnostic X-ray for cars!',
      },
      {
        id: 'q4-4',
        question: 'You hear a GRINDING noise when you brake. What should you do?',
        options: [
          'Turn the music up louder',
          'Get it fixed immediately — brake pads are worn to metal and it\'s dangerous',
          'Only worry about it next month',
          'Add more fuel',
        ],
        correct: 1,
        explanation: 'Grinding brakes mean the pads have worn through completely. Metal on metal braking is dangerous and will damage expensive discs. Fix immediately!',
      },
    ],
  },
  {
    id: 'level-5',
    level: 5,
    title: 'Advanced Mechanics',
    emoji: '🚀',
    description: 'Master-level knowledge: turbochargers, EVs, transmissions and more!',
    color: '#9F7AEA',
    bgColor: '#44337A',
    unlockRequirement: 850,
    xpTotal: 350,
    badge: { id: 'master-engineer', name: 'Master Engineer', emoji: '🚀', description: 'Achieved the highest level of car knowledge!' },
    lessons: [
      {
        id: 'l5-transmission',
        title: 'Manual vs Automatic Transmission',
        emoji: '⚙️',
        xpReward: 50,
        content: `The **transmission** (also called the gearbox) is a vital link between the engine and the wheels. It changes the ratio of engine speed to wheel speed — like the gears on a bicycle!

**Why do we need gears?**
An engine works best at certain speeds. If you used just one gear, the engine would struggle at low speeds and scream at high speeds. Gears let the engine stay in its "sweet spot" at all times.

**🦾 Manual Transmission (Manual Gearbox)**
The driver controls the gears themselves using:
- A **gear lever** (the stick in the middle of the car)
- A **clutch pedal** (left pedal) that temporarily disconnects the engine from the gearbox

The sequence: Press clutch → Move gear lever → Release clutch slowly while pressing accelerator

Gear 1: Starting from stop (most force, low speed)
Gear 2: Slow speeds
Gear 3-4: Town driving
Gear 5-6: Motorway speeds (least force, high speed)
Reverse: Goes backwards!

**🤖 Automatic Transmission**
The car changes gears by itself! A computer monitors speed and engine load and changes gears at the perfect time. The driver just has P (Park), R (Reverse), N (Neutral), D (Drive).

How it works: A **torque converter** replaces the clutch, using hydraulic fluid to transmit engine power. Planetary gear sets inside change the ratios automatically.

**🏎️ Dual-Clutch Transmission (DCT)**
The best of both worlds — uses two clutches alternating between odd and even gears for super-fast, smooth gear changes. Used in sports cars like the Porsche 911!`,
        funFact: 'The first automatic transmission was introduced by General Motors in 1940! Before that, ALL cars were manual — even grandma had to use a clutch!',
        analogy: 'Gears are like the different speeds on a blender. Low speed = more power for thick mixtures. High speed = faster spinning for smooth liquids!',
      },
      {
        id: 'l5-forced-induction',
        title: 'Turbochargers & Superchargers',
        emoji: '💨',
        xpReward: 50,
        content: `Want more power from your engine without making it bigger? You can **force more air in** — and where there's more air, you can burn more fuel and make more power! This is called **forced induction**.

**🌀 Turbocharger**
A turbocharger uses **exhaust gases** to spin a turbine, which spins a compressor that forces extra air into the engine. It's essentially free power — it's using energy that would have been wasted!

How it works:
1. Hot exhaust gases spin the **turbine wheel** at up to 250,000 rpm
2. The turbine is connected to a **compressor wheel**
3. The compressor squeezes extra air into the engine
4. More air + more fuel = more power!

**Problem:** Turbo lag — there's a delay while the exhaust builds up enough pressure to spin the turbine. Modern turbos are much better at this.

**⚡ Supercharger**
A supercharger is similar but driven directly by the engine via a belt — so it works instantly with no lag. It makes a distinctive whining sound.

**Trade-off:** Since the engine powers the supercharger, some of that extra power is used to drive it. Turbos are generally more efficient.

**Twin-turbo, triple-turbo...** Very powerful cars (like Bugatti Veyron) can have multiple turbochargers! The Veyron has FOUR!

A turbocharged engine can produce **40-50% more power** than the same engine without a turbo!`,
        funFact: 'Turbochargers were first used in aircraft engines during World War I to help planes fly higher where the air is thin. They weren\'t used in cars until the 1960s!',
        analogy: 'A turbocharger is like blowing on a campfire to make it bigger — forcing more air in makes the fire (combustion) more powerful!',
      },
      {
        id: 'l5-ev-systems',
        title: 'Electric & Hybrid Vehicle Systems',
        emoji: '🔋',
        xpReward: 50,
        content: `Electric vehicles (EVs) are the future of motoring! Let's understand how they work and why they're so amazing.

**⚡ How Electric Cars Work**

Instead of an engine burning fuel, EVs use a **large battery pack** and **electric motor(s)**.

**Battery Pack** — The heart of an EV. Made of thousands of small lithium-ion cells (like bigger versions of phone batteries) arranged in a flat pack under the car floor. A Tesla Model 3 has ~4,500 battery cells!

**Electric Motor** — Converts electrical energy into rotational movement. Motors are simple, efficient, and super reliable (no oil changes needed!). Many EVs have a motor for each axle.

**Power Electronics** — Converts the battery's DC electricity to the AC current the motor needs, and controls how much power goes where.

**🔁 Regenerative Braking (The Clever Bit!)**
When you brake or lift off the accelerator, the electric motor REVERSES its job — it becomes a **generator**. The wheels spin the motor, which generates electricity that goes BACK into the battery!

This means every time you brake, you're recovering energy that would have been wasted as heat in regular brakes. This is why EVs get BETTER efficiency in city driving with lots of stops!

**🔀 Hybrid Cars**
Hybrids combine a petrol engine with an electric motor and small battery:
- Low speeds: electric motor only (quiet and efficient)
- High speeds: petrol engine takes over or assists
- Braking: regenerative charging

**Full Hybrid** (like Toyota Prius) — Can drive short distances on electric only
**Plug-in Hybrid (PHEV)** — Larger battery that you can charge from a plug`,
        funFact: 'The Tesla Model S Plaid can accelerate from 0 to 100 km/h in just 2.1 seconds — faster than any petrol sports car! Electric motors produce maximum torque instantly from zero rpm.',
        analogy: 'A hybrid car is like a student who walks to nearby places (electric motor) but takes the bus for long journeys (petrol engine) — using the most efficient option each time!',
      },
      {
        id: 'l5-obd-computers',
        title: 'OBD-II & Car Computers',
        emoji: '💻',
        xpReward: 50,
        content: `Modern cars are basically computers on wheels! They have multiple computers (called **ECUs** — Electronic Control Units) managing everything from the engine to the seats.

**The Main ECU: Engine Control Module (ECM)**
This computer monitors everything happening in the engine using hundreds of sensors:
- 🌡️ **Temperature sensors** — coolant temp, air temp, exhaust temp
- 💨 **Airflow sensors** — how much air is entering the engine
- 🔄 **Crankshaft position** — exactly where each piston is
- 🧪 **Oxygen sensor (Lambda)** — measures if the fuel mixture is right
- 💥 **Knock sensor** — detects engine knock (bad combustion)

The ECM reads all this data and makes thousands of adjustments per second — when to fire the spark plugs, how much fuel to inject, adjusting ignition timing. It's like having a super-fast pit crew making constant tweaks while you drive!

**🔌 OBD-II (On-Board Diagnostics)**
Since 1996, ALL cars sold must have a standard OBD-II port (usually under the dashboard). When something goes wrong, the ECU stores a **Diagnostic Trouble Code (DTC)**.

Example codes:
- **P0300** — Random misfire detected
- **P0171** — System too lean (not enough fuel)
- **P0420** — Catalytic converter efficiency low

A mechanic plugs a **scan tool** into the OBD-II port to read these codes. Some modern phones can do this too with a Bluetooth dongle!

**CAN Bus System** — All the computers in the car communicate on a shared network called the CAN (Controller Area Network) bus — like the internet but inside your car.`,
        funFact: 'A modern premium car like a BMW 7 Series has over 100 separate ECUs running on a network that transfers data at up to 100 Megabits per second — faster than many home internet connections!',
      },
      {
        id: 'l5-aerodynamics',
        title: 'Introduction to Aerodynamics',
        emoji: '🌬️',
        xpReward: 50,
        content: `**Aerodynamics** is the study of how air moves around objects. For cars, understanding aerodynamics is crucial for speed, fuel efficiency, and stability.

**Why does it matter?**
Air resistance (called **drag**) increases exponentially with speed. At 100 km/h, about 75% of engine power is spent fighting air resistance! Making a car more aerodynamic means it needs less power to maintain speed.

**Key aerodynamic concepts:**

**💨 Drag** — The force pushing against the car as it moves forward. Sports cars are shaped like teardrops to minimise drag. The **drag coefficient (Cd)** is a number measuring how aerodynamic a shape is. A brick wall = 1.0. A modern EV = 0.20!

**⬇️ Downforce** — The force pushing the car DOWN towards the road. More downforce = more grip, so faster cornering! Racing cars use **wings** (like upside-down aeroplane wings) to generate massive downforce.

**🔀 Diffusers** — Channels under the car that speed up airflow and create low pressure, sucking the car toward the road.

**🏎️ Spoilers vs Wings**
- Spoilers disrupt airflow to reduce lift
- Wings actively generate downforce

**Real world examples:**
- A Formula 1 car generates enough downforce to drive UPSIDE DOWN on the ceiling at 130 km/h!
- Car companies spend millions on wind tunnel testing before a new model is released
- Even adding a roof box to your car increases fuel consumption by up to 30%!`,
        funFact: 'The Mercedes-Benz EQXX concept car has a drag coefficient of just 0.17 — the most aerodynamic road car ever made. Its shape was inspired by... a shark!',
        analogy: 'Aerodynamics is like swimming. A streamlined swimmer in a diving position moves through water easily. Standing upright in water creates much more resistance — just like a boxy car vs a sleek sports car!',
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What does a turbocharger use to spin its turbine?',
        options: [
          'Electricity from the battery',
          'A belt connected to the engine',
          'Exhaust gases from the engine',
          'Compressed air from the tyres',
        ],
        correct: 2,
        explanation: 'A turbocharger uses HOT EXHAUST GASES to spin a turbine, which drives a compressor that forces more air into the engine — recycling wasted energy!',
      },
      {
        id: 'q5-2',
        question: 'What is regenerative braking?',
        options: [
          'Brakes that repair themselves',
          'Using the electric motor as a generator to recover energy when braking',
          'Extra-strong brake pads',
          'Brakes cooled by water',
        ],
        correct: 1,
        explanation: 'Regenerative braking uses the electric motor in reverse as a generator. When braking, the wheel spin generates electricity that recharges the battery — recovering energy that would be wasted as heat!',
      },
      {
        id: 'q5-3',
        question: 'In a manual car, what does the clutch pedal do?',
        options: [
          'It controls the brakes',
          'It temporarily disconnects the engine from the gearbox so you can change gears',
          'It increases engine speed',
          'It turns on the headlights',
        ],
        correct: 1,
        explanation: 'The clutch disconnects the engine from the transmission. You press it to "break the connection" so you can move the gear lever without grinding the gears!',
      },
      {
        id: 'q5-4',
        question: 'What is DOWNFORCE in aerodynamics?',
        options: [
          'The weight of the car pressing down due to gravity',
          'The force pushing the car down towards the road, generated by wings and body shape',
          'The braking force',
          'Wind resistance slowing the car',
        ],
        correct: 1,
        explanation: 'Downforce is generated by the car\'s body shape and wings. It pushes the car toward the road, giving the tyres more grip — essential for fast cornering in racing!',
      },
      {
        id: 'q5-5',
        question: 'What does ECU stand for in car electronics?',
        options: [
          'Engine Combustion Unit',
          'Electronic Control Unit',
          'Exhaust Cooling Unit',
          'Emergency Cutoff Unit',
        ],
        correct: 1,
        explanation: 'ECU stands for Electronic Control Unit — the computers that manage different systems in a modern car. There can be over 100 ECUs in a premium car!',
      },
    ],
  },
];

export const BADGES = [
  { id: 'car-basics', name: 'Car Whiz', emoji: '🏎️', description: 'Learned the basics of how cars work!' },
  { id: 'engine-expert', name: 'Engine Expert', emoji: '⚙️', description: 'Mastered the secrets of car engines!' },
  { id: 'systems-pro', name: 'Systems Pro', emoji: '🔌', description: 'Understands all car systems like a pro!' },
  { id: 'oil-change-pro', name: 'Oil Change Pro', emoji: '🛢️', description: 'Knows how to maintain and diagnose car problems!' },
  { id: 'master-engineer', name: 'Master Engineer', emoji: '🚀', description: 'Achieved the highest level of car knowledge!' },
  { id: 'quiz-master', name: 'Quiz Master', emoji: '🎯', description: 'Got 10 quiz questions correct!' },
  { id: 'streak-3', name: 'Hot Streak!', emoji: '🔥', description: 'Logged in 3 days in a row!' },
  { id: 'first-lesson', name: 'First Step', emoji: '👣', description: 'Completed your very first lesson!' },
  { id: 'workshop-builder', name: 'Workshop Builder', emoji: '🔨', description: 'Completed the engine assembly workshop!' },
  { id: 'diagnostician', name: 'Diagnostician', emoji: '🩺', description: 'Solved 3 diagnosis challenges!' },
];

export const LEVELS = [
  { name: 'Apprentice', minXP: 0, maxXP: 200, emoji: '🔰', color: '#718096' },
  { name: 'Junior Mechanic', minXP: 200, maxXP: 500, emoji: '🔧', color: '#48BB78' },
  { name: 'Senior Mechanic', minXP: 500, maxXP: 900, emoji: '⚙️', color: '#4299E1' },
  { name: 'Master Engineer', minXP: 900, maxXP: 1600, emoji: '🚀', color: '#9F7AEA' },
];

export function getLevelForXP(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return { ...LEVELS[i], index: i };
  }
  return { ...LEVELS[0], index: 0 };
}

export function getXPProgress(xp: number) {
  const level = getLevelForXP(xp);
  const range = level.maxXP - level.minXP;
  const progress = xp - level.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}
