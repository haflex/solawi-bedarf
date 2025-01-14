{src, version, npmDepsHash, buildNpmPackage}:
buildNpmPackage {
    pname = "solawi-bedarf-frontend";
    inherit version src npmDepsHash;
    sourceRoot = "source/frontend";
      
    #patches = if version == "0.0.0" then [
    #    ./005-content.patch
    #] else [
    #    ./005-content-2.patch
    #];

    dontBuild = true;

    #postPatch = ''
    #    chmod +w ../shared/src
    #    rm ../shared/src/config.ts
    #'';
    #chmod +w ../shared/src/config.ts
    #cp ${configFile} ../shared/src/config.ts

    installPhase = ''
        mkdir -p $out/frontend
        install package.json package-lock.json tsconfig.json tsconfig.node.json $out/frontend/
        install vite.config.ts index.html $out/frontend/
        cp -r src node_modules $out/frontend
    '';

    #buildPhase = ''
    #    npm run build
    #'';

    #installPhase = ''
    #    cp -r dist/* $out/frontend
    #'';
    meta = {
        description = "Frontend for the solawi-bedarf app";
        license = "AGPL-3.0";
        homepage = "";
    };
}