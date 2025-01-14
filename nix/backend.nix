{src, version, npmDepsHash, buildNpmPackage, runtimeShell, nodejs}:
buildNpmPackage {
    pname = "solawi-bedarf-backend";
    inherit version src npmDepsHash;
    sourceRoot = "source/backend";

    #unpackPhase = ''
    #    mkdir source
    #    cp -r $src/* source/
    #    chmod ug+w -R source
    #'';

    dontBuild = true;

    patches = [
        #./001-backend-package.patch
        ./002-database-use-url-2.patch
        ./003-server-port.patch
        ./004-roles.patch
    ];
    #postPatchPhase = ''
    #    chmod +w ../shared/src/config.ts
    #    cp ${configFile} ../shared/src/config.ts
    #'';

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
