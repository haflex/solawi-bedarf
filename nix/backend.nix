{src, version, npmDepsHash, buildNpmPackage, runtimeShell, nodejs}:
buildNpmPackage {
    pname = "solawi-bedarf-backend";
    inherit version src npmDepsHash;
    sourceRoot = "source/backend";

    dontBuild = true;

    installPhase = ''
        mkdir -p $out/backend
        install package.json package-lock.json tsconfig.json $out/backend/
        cp -r src node_modules $out/backend
    '';

    meta = {
        description = "Backend for the solawi-bedarf app";
        license = "AGPL-3.0";
        homepage = "";
    };
}
