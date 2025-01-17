{
  config,
  lib,
  pkgs,
  ...
}: with lib; let
  cfg = config.services.solawi-bedarf;

in {
    options.services.solawi-bedarf = {
        enable = mkEnableOption "Solawi Bedarf";
        package = mkOption {  };
        host = mkOption { type = types.str; };
        ldapEnable = mkEnableOption "LDAP";
        ldapUrl = mkOption { type = types.str; };
        ldapAdminDN = mkOption { type = types.str; };
        ldapAdminPasswordFile = mkOption { type = types.str; };
        ldapUserSearchBase = mkOption { type = types.str; };
        ldapGroupSearchBase = mkOption { type = types.str; };
        ldapGroupMemberAttribute = mkOption { type = types.str; };
    };

    config = mkIf cfg.enable
    {
        #database
        services.postgresql = {
            enable = true;
            ensureDatabases = ["plant"];
            ensureUsers = [
            {
                name = "plant";
                ensureDBOwnership = true;
            }
            ];
        };
        #user
        users.users.plant = {
            isSystemUser = true;
            group = "plant";
        };
        users.groups.plant = {};
        systemd.services.bedarf-be = {
            description = "Plantage Backend";
            wantedBy = ["default.target"];
            after = [ "postgresql.service" ];
            environment = {
                POSTGRES_URL = "socket:/run/postgresql";
                POSTGRES_PORT = "5432";
                POSTGRES_DB = "plant";
                SERVER_PORT = "3030";
            } // (if cfg.ldapEnable then {
                LDAP_ENABLED = "true";
                LDAP_URL = cfg.ldapUrl;
                LDAP_ADMIN_DN = cfg.ldapAdminDN;
                LDAP_ADMIN_Password = builtins.readFile cfg.ldapAdminPasswordFile;
                LDAP_USER_SEARCHBASE = cfg.ldapUserSearchBase;
                LDAP_GROUP_SEARCHBASE = cfg.ldapGroupSearchBase;
                LDAP_GROUP_MEMBER_ATTRIBUTE = cfg.ldapGroupMemberAttribute;
            } else {});
            script = "${cfg.package}/bin/bedarf-be";
            serviceConfig = {
                User = "plant";
                Group = "plant";
            };
        };
        #nginx
        services.nginx.virtualHosts."${cfg.host}" = {
            root = "${cfg.package}/frontend-dist";
            locations = {
            "/api/" = {
                proxyPass = "http://localhost:3030/";
            };
            "/".extraConfig = ''
                add_header 'Cache-Control' 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
            '';
            };
        };
    };
}
