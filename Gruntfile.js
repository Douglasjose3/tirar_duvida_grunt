module.exports = function(grunt) { // exportar o grunt.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: { // configuração do plugin less
            development: { // ambiente padrão dentro da nossa máquina
                files: {
                    'dev/styles/style.css': './src/styles/style.less'
                }
            },
            production: { // ambiente de produção, ambiente final onde ele estará rodando
                options: {
                    compress: true, //recebe um bolleano
                },
                files: {
                    'dist/styles/style.min.css': './src/styles/style.less' // cria o arquivo minificado
                }
            }
        },
        watch: { // configuração do plugin watch
            less: {
                files: ['./src/styles/**/*.less'], //** referenciar as todas as pastas   */ sozinha serve para referenciar todos os arquivos
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './src/scripts/script.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'], // origem
                        dest: 'dev/' // destino
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['./prebuild/index.html'], // origem
                        dest: 'dist/' // destino
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html' // 1 - minificação
                     // 2 - substituiçã'
                }
            }
        },
        clean: ['prebuild']
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch'); // carregamento do plugin para não precisar chamar o comando dentro do terminal (npm rum grunt)
    grunt.loadNpmTasks('grunt-replace'); // carregamento do plugin para apontar o html para a pasta dist
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // carregamento do plugin para desenvolvedor
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean']);
}