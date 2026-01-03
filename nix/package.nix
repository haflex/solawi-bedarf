{src, buildNpmPackage, runtimeShell, nodejs, bash, git}:
buildNpmPackage {
    pname = "solawi-bedarf";
    version = "0.15.3";

    inherit src;
    npmDepsHash = "sha256-YyORz6ytyYZWNTI87GI/yKk7mX5m2KcV1LhfjSLJIV4=";

    prePatch = ''
        ls
        pwd 
        cp nix/buildInfo.ts shared/src/buildInfo.ts
    '';

    buildPhase = ''
        runHook preBuild
        npm run build --workspace frontend
        runHook postBuild
    '';

    installPhase = ''
        echo "Installing..."
        mkdir -p $out/bin
        cp -r backend $out/backend
        cp -r shared $out/shared
        cp -r frontend $out/frontend
        cp -r node_modules $out/node_modules
        cat <<EOF > $out/bin/bedarf-be
        #!${runtimeShell}
        exec ${nodejs}/bin/node $out/node_modules/.bin/ts-node $out/backend/src/index.ts
        EOF
        chmod +x $out/bin/bedarf-be
    '';

    meta = {
        description = "Solawi-Bedarf app";
        license = "AGPL-3.0";
        homepage = "";
    };
}