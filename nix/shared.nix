{src, version, npmDepsHash, buildNpmPackage}:
buildNpmPackage {
    pname = "solawi-bedarf-shared";
    inherit version src npmDepsHash;
    sourceRoot = "source/shared";
      
    #patches = if version == "0.0.0" then [
    #    ./005-content.patch
    #] else [
    #    ./005-content-2.patch
    #];

    dontBuild = true;

    installPhase = ''
        mkdir -p $out/shared
        install package.json package-lock.json tsconfig.json $out/shared/
        cp -r src node_modules $out/shared
    '';
    meta = {
        description = "Shared for the solawi-bedarf app";
        license = "AGPL-3.0";
        homepage = "";
    };
}