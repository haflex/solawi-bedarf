{nixpkgs, self}:
nixpkgs.lib.nixosSystem {
  system = "x86_64-linux";
  modules = [
    self.nixosModules.default
    ({config, pkgs, lib, ...}: {
      boot.isContainer = true;
      networking.hostName = "bedarftest";
      networking.firewall.allowedTCPPorts = [ 80 ];
      nix.settings.experimental-features = [ "nix-command" "flakes" ];
      nix.registry.os.flake = nixpkgs;
      system.stateVersion = "24.05";
      environment.systemPackages = with pkgs; [
        #shelldap
        #mailpit
      ];
      #config bedarf
      services.solawi-bedarf = {
        host = "bedarf";
        enable = true;
        package = self.packages.x86_64-linux.default;
        ldapEnable = false;
      };
      services.nginx.enable = true;
    })
  ];
}
 