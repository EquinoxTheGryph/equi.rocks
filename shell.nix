# A nix-shell environment ready to develop the project in
# Applies the following techniques to get it to work properly:
# - prisma: https://github.com/prisma/prisma/issues/3026#issuecomment-1439131599
# - postgresql: https://unix.stackexchange.com/questions/464106/killing-background-processes-started-in-nix-shell/489687#489687
{ pkgs ? import <nixpkgs> {} }:

let lib = pkgs.lib;

in pkgs.mkShell (with pkgs; {
    buildInputs = [
        nodejs
        openssl
        glibcLocales
        postgresql
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin:$PATH" \
               LANG=en_US.UTF-8 \
               PGDATABASE=equirocks \
               PGDATA="$PWD/.nix/pgdata" \
               PGSOCKET="$PWD/.nix/sockets" \
               PGHOST="localhost" \
               PGPORT="5432" \
               PGUSER="$USER"
        
        trap "'$PWD/nix-client' remove" EXIT
        ./nix-client add
    '';

    PRISMA_MIGRATION_ENGINE_BINARY = "${prisma-engines}/bin/migration-engine";
    PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
    PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
    PRISMA_INTROSPECTION_ENGINE_BINARY = "${prisma-engines}/bin/introspection-engine";
    PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";
})
