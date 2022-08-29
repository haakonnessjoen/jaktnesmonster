all: build/jakt_nes

build/jakt_nes: src/apu.jakt src/cart.jakt src/cpu.jakt src/main.jakt src/ppu.jakt src/sdl.jakt src/system.jakt src/video.jakt
	jakt src/main.jakt -l SDL2 -I /opt/homebrew/Cellar/sdl2/2.0.22/include -L /opt/homebrew/Cellar/sdl2/2.0.22/lib -I ../jakt/runtime -O -o jakt_nes

test: build/jakt_nes
	./build/jakt_nes build/nestest.nes > output.txt
	node comp.js

run: build/jakt_nes
	./build/jakt_nes build/nestest.nes