{ src, callPackage, stdenv, runtimeShell, nodejs }:
let
    name = "solawi-bedarf";
    version = "0.4.10";
    frontendNpmDepsHash = "sha256-U2LKq2fp6ahpGgMF90Y7y0xxl/4p4m9GednM0+1OTHs=";
    backendNpmDepsHash = "sha256-xyRzrzGyhmG3QGbNMRPrEEXms+WESVrMNRYlJvQfHFE=";
    sharedNpmDepsHash = "sha256-dL5PthKdsOV5DLtf1PGOQPlR2TKis/crQ8AR3EGosl4=";
    frontend = callPackage ./frontend.nix {
        inherit src version;
        npmDepsHash = frontendNpmDepsHash;
    };
    backend = callPackage ./backend.nix {
        inherit src version;
        npmDepsHash = backendNpmDepsHash;
    };
    shared = callPackage ./shared.nix {
        inherit src version;
        npmDepsHash = sharedNpmDepsHash;
    };
in stdenv.mkDerivation {
    name = "solawi-bedarf";
    phases = ["unpackPhase" "buildPhase" "installPhase"];
    unpackPhase = ''
        mkdir -p source
        cp -r ${frontend}/. source
        cp -r ${shared}/. source
        cp -r ${backend}/. source
        chmod -R u+w source
    '';
    buildPhase = ''
        echo "Building frontend"
        cd source/frontend
        ${nodejs}/bin/npm run build
        cd ../..
    '';
    installPhase = ''
        echo "Installing frontend"
        mkdir -p $out/bin
        cp -r source/frontend/dist $out/frontend-dist
        cp -r source/backend $out/backend
        cp -r source/shared $out/shared
        cat <<EOF > $out/bin/bedarf-be
        #!${runtimeShell}
        exec ${nodejs}/bin/node $out/backend/node_modules/.bin/ts-node $out/backend/src/index.ts
        EOF
        chmod +x $out/bin/bedarf-be
    '';
}
