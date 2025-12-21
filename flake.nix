{
  description = "Solawi Bedarf";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
  let
    pkgs = import nixpkgs { system = "x86_64-linux"; };
  in {

  
    packages.x86_64-linux.default = pkgs.callPackage nix/package.nix { src = self; };

    nixosModules.default = import ./nix/module.nix;

    #nix build .#nixosConfigurations.container.config.system.build.toplevel
    nixosConfigurations.container = import ./nix/container.nix { inherit nixpkgs self; };

    devShells.x86_64-linux.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs
      ];
    };

  };
}
